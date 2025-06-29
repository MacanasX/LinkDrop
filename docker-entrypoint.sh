#!/bin/sh
set -e

echo "Container role: ${CONTAINER_ROLE}"

if [ "$CONTAINER_ROLE" = "app" ]; then
    # Wait for DB
    echo "Waiting for MySQL to be ready..."
    until nc -z -v -w30 mysql 3306
    do
        echo "Waiting for database connection..."
        sleep 1
    done

    # Run Laravel setup
    echo "Running Laravel setup..."
    php artisan migrate --force
    php artisan storage:link
    php artisan optimize:clear
    php artisan optimize

    # Start app (PHP-FPM)
    echo "Starting PHP-FPM..."
    exec php-fpm
elif [ "$CONTAINER_ROLE" = "queue-worker" ]; then
    # Start Laravel queue worker
   exec "$@"
elif [ "$CONTAINER_ROLE" = "scheduler" ]; then
    # Start Laravel scheduler
    echo "Starting Laravel scheduler..."
  exec "$@"
else
    echo "UNKNOWN CONTAINER_ROLE: ${CONTAINER_ROLE}"
    exit 1
fi
