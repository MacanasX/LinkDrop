import { router } from '@inertiajs/react';
import clsx from 'clsx';

export function Pagination({ meta }) {
    if (meta?.last_page === 1) return null;
    const handleClick = (url) => {
        if (url) {
            router.get(url);
        }
    };

    const trimmedLinks = (() => {
        const { current_page, links } = meta;

        const first = links[0];
        const last = links[links.length - 1];

        const visible = links.slice(1, links.length - 1).filter((link) => {
            const pageNum = Number(link.label);
            return !isNaN(pageNum) && Math.abs(pageNum - current_page) <= 1;
        });

        return [first, ...visible, last];
    })();

    return (
        <div className='w-full mt-6 flex justify-center'>
            <div className='flex flex-wrap justify-center gap-2 max-w-full'>
                {trimmedLinks.map((link, index) => (
                    <button
                        key={index}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        onClick={() => handleClick(link.url)}
                        disabled={!link.url}
                        className={clsx(
                            'px-3 py-1 min-w-[40px] text-sm border rounded transition-colors duration-200 text-center break-words',
                            {
                                'bg-blue-600 text-white hover:bg-blue-800':
                                    link.active,
                                'bg-white text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600':
                                    !link.active,
                                'opacity-50 cursor-not-allowed': !link.url,
                                'hover:cursor-pointer': !!link.url,
                            },
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
