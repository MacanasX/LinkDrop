import { Field as HeadlessField } from '@headlessui/react';
import clsx from 'clsx';

const Field = ({ children, direction = 'col', className = '' }) => {
    const flexDirection =
        direction === 'row' ? 'flex-row gap-x-3' : 'flex-col gap-y-3';

    return (
        <HeadlessField className={clsx('flex', flexDirection, className)}>
            {children}
        </HeadlessField>
    );
};
export default Field;
