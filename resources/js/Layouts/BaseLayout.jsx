import { Fragment } from 'react';
import { Head } from '@inertiajs/react';

export function BaseLayout({
    title,
    description,
    canonical,
    robots,
    children,
}) {
    return (
        <Fragment>
            <Head>
                {title ? <title>{title}</title> : null}
                {description ? (
                    <meta name='description' content={description} />
                ) : null}
                {robots && <meta name='robots' content={robots} />}
                {canonical && <link rel='canonical' href={canonical} />}
                <link rel='icon' href='/favicon.ico' />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/favicon-16x16.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/favicon-32x32.png'
                />
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/apple-touch-icon.png'
                />
            </Head>
            {children}
        </Fragment>
    );
}
