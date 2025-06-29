import clsx from 'clsx';

export function Loader({ classNames }) {
    return (
        <div
            className={clsx(
                'w-5 h-5 border-2 border-t-transparent border-[#EB1546] rounded-full animate-spin p-2 ',
                classNames,
            )}
        />
    );
}
