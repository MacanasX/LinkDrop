import { SiteLayout } from '@/Layouts/SiteLayout.jsx';
import { router, usePage } from '@inertiajs/react';

export default function ClientError({ statusCode }) {
    return (
        <div className='flex min-h-screen w-full flex-col items-center justify-center  px-6 text-white'>
            <h1 className='select-none font-extrabold text-[140px] leading-none text-gray-700 lg:text-[220px]'>
                {statusCode}
            </h1>

            <div className='mt-4 max-w-xl text-center'>
                <h2 className='font-bold text-3xl tracking-tight text-white sm:text-4xl  inline-block px-6 py-3 shadow-2xl'>
                    Oops, something went wrong.
                </h2>

                <p className='mt-6 text-gray-400'>
                    Please check the URL or try refreshing the page. If the
                    problem persists, contact support.
                </p>
            </div>

            <button
                onClick={() => router.reload()}
                className='mt-10 rounded-md bg-blue-500 px-6 py-3 text-lg font-semibold hover:cursor-pointer text-white shadow-lg transition-colors hover:bg-blue-800 focus:outline-none focus:ring-4 '
                aria-label='Reload page'
            >
                Reload
            </button>
        </div>
    );
}

ClientError.layout = (page) => (
    <SiteLayout
        robots='noindex, nofollow'
        canonical={page.props.appUrl}
        title='LinkDrop - Error'
        children={page}
    />
);
