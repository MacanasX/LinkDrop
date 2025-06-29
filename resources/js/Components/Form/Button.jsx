import clsx from 'clsx';
import { Loader } from '@/Components/Loader.jsx';

export function Button({
    disabled,
    onClick = () => {},
    classNames,
    type = 'button',
    children,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'border border-solid border-gray-600 p-2 m-2 min-w-1/6 bg-gray-800 rounded-xl hover:border-white hover:cursor-pointer hover:bg-gray-700',
                'flex items-center justify-center',
                classNames,
            )}
        >
            {disabled ? <Loader /> : children}{' '}
        </button>
    );
}
