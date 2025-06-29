import React from 'react';
import { Label as HeadlessLabel } from '@headlessui/react';

const Label = ({ children, htmlFor, required }) => {
    return (
        <HeadlessLabel htmlFor={htmlFor} className='text-base'>
            {children} {required && '*'}
        </HeadlessLabel>
    );
};
export default Label;
