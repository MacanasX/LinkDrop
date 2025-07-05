import { SiteLayout } from '@/Layouts/SiteLayout.jsx';
import { Link, usePage } from '@inertiajs/react';
import { Pagination } from '@/Components/Pagination.jsx';

export default function Spotlight({ links }) {
    const { appUrl } = usePage().props;

    return (
        <>
            <section className='max-w-4xl mx-auto p-6'>
                <h1 className='text-4xl font-extrabold mb-6 text-center'>
                    Most Clicked Media
                </h1>

                {links?.data?.length === 0 ? (
                    <p className='text-center text-gray-500'>
                        No links to show yet.{' '}
                        <Link
                            className='text-blue-600 hover:text-white underline'
                            href={'/'}
                        >
                            Be the first one.
                        </Link>
                    </p>
                ) : (
                    <div className='flex flex-col gap-4'>
                        {links.data.map((link) => (
                            <a
                                key={link.slug}
                                href={`${appUrl}/links/${link.slug}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='p-4 border border-white rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-700 hover:shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between text-blue-600 no-underline'
                                title={link.title || link.url}
                            >
                                <p className='text-2xl whitespace-nowrap text-white flex gap-x-3 sm:justify-center sm:items-center'>
                                    {link?.accessCount}{' '}
                                    {link?.accessCount === 1
                                        ? 'Click'
                                        : 'Clicks'}
                                    {link?.creator && (
                                        <span className='mt-1 inline-block rounded-full bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1'>
                                            by {link.creator}
                                        </span>
                                    )}
                                </p>

                                <span className='text-xl font-semibold break-words max-w-[80%] sm:max-w-1/2 truncate'>
                                    {link.media.fileName || ''}
                                </span>
                            </a>
                        ))}
                    </div>
                )}
                <div className='mt-6 flex justify-center'>
                    <Pagination meta={links?.meta} />
                </div>
            </section>
        </>
    );
}

Spotlight.layout = (page) => (
    <SiteLayout
        robots='index, follow'
        canonical={page.props.appUrl + '/spotlight'}
        title='LinkDrop - Spotlight'
        children={page}
    />
);
