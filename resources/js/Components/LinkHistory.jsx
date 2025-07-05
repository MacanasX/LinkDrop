import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import { Pagination } from '@/Components/Pagination.jsx';

export const LinkHistory = ({ linkHistory }) => {
    return (
        <div>
            <h2 className='text-3xl font-bold my-3'>Link History</h2>
            {linkHistory?.data?.length ? (
                <>
                    <ul className='space-y-2'>
                        {linkHistory.data.map((item) => (
                            <li key={item.slug}>
                                <Link
                                    href={`/links/${item.slug}`}
                                    className='block p-3 border rounded hover:border-blue-500 transition'
                                >
                                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-white'>
                                        <div className='text-sm  break-words  p-1'>
                                            {item.preview}
                                        </div>

                                        <div className='flex items-center justify-between space-x-2 text-xs  p-1 min-w-1/3 '>
                                            <span className='whitespace-nowrap'>
                                                {item.createdAt}
                                            </span>
                                            <TypeBadge type={item.type} />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Pagination meta={linkHistory.meta} />
                </>
            ) : (
                <p className='text-gray-400'>No links generated yet.</p>
            )}
        </div>
    );
};

const TypeBadge = ({ type }) => {
    return (
        <span
            className={clsx(
                'inline-block px-2 py-0.5 text-xs font-medium rounded-full capitalize text-white',
                {
                    'bg-blue-500': type?.toLowerCase() === 'file',
                    'bg-green-500': type?.toLowerCase() === 'text',
                },
            )}
        >
            {type}
        </span>
    );
};
