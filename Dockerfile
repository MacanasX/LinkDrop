### Frontend Build Stage ###
FROM node:22-alpine as frontend-builder



COPY ./package.json /frontend/package.json
COPY ./yarn.lock /frontend/yarn.lock
COPY ./vite.config.js /frontend/vite.config.js
COPY ./resources/ /frontend/resources/

WORKDIR /frontend

RUN yarn install --frozen-lockfile
RUN mkdir -p /frontend/public/build
RUN yarn build


### Backend Stage (Laravel App) ###
FROM php:8.4-fpm

# Install PHP extensions & system deps
RUN apt-get update -y && apt-get install -y \
    default-mysql-client \
    libzip-dev \
    zip unzip git curl netcat-openbsd \
    && pecl install redis \
    && apt-get -y clean \
    && docker-php-ext-enable redis \
    && docker-php-ext-install pdo pdo_mysql zip exif

# Set upload limits
RUN echo "upload_max_filesize = 5M" > /usr/local/etc/php/conf.d/uploads.ini \
 && echo "post_max_size = 5M" >> /usr/local/etc/php/conf.d/uploads.ini

# Set working directory
WORKDIR /var/www/html

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy composer files & install PHP deps
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts --prefer-dist


# Copy Laravel app source
COPY . .


RUN mkdir -p storage/framework/cache storage/framework/views bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data public \
    && chmod -R 775 public \
    && chown -R www-data:www-data public/build
# ✅ Copy built frontend assets from the frontend build stage
COPY --from=frontend-builder /frontend/public/build /var/www/html/public/build

# Set proper permissions
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Make sure it's executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Replace the default command with the entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]

