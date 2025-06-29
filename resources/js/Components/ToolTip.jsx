import { useState } from 'react';
import clsx from 'clsx';
import Icon from '@mdi/react';
import { mdiExclamation } from '@mdi/js';

export function Tooltip({ classNames, children, tooltipText }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className={clsx('absolute z-50', classNames)}>
            <Icon
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className='border border-white rounded-full'
                path={mdiExclamation}
                size={1}
            />

            {/* Tooltip box */}
            {visible && (
                <div className='absolute bottom-full mb-2 left-20 transform -translate-x-1/2 w-max max-w-xs px-3 py-2 rounded-md bg-gray-900 text-white text-sm shadow-lg z-50'>
                    {tooltipText}
                </div>
            )}
        </div>
    );
}
