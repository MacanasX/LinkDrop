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
            </Head>
            {children}
        </Fragment>
    );
}
