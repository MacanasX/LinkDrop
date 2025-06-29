import React from 'react';
import { Input as HeadlessInput } from '@headlessui/react';
import clsx from 'clsx';
import Field from './Field';
import Label from './Label';
import Error from './Error';

export function Input({
    id,
    label,
    name,
    type,
    value,
    required,
    errors,
    placeholder,
    onChange = () => {},
    ...props
}) {
    return (
        <Field>
            <Label htmlFor={id || name} required={required}>
                {label}
            </Label>
            <HeadlessInput
                id={id || name}
                value={value}
                name={name}
                type={type || 'text'}
                aria-label={name}
                className={clsx(
                    'w-full h-10  px-2 text-base border border-solid border-gray-600 bg-gray-800 rounded-lg ',
                    { 'border-red-500': errors },
                )}
                onChange={onChange}
                placeholder={placeholder}
                {...props}
            />
            {!!errors && <Error>{errors}</Error>}
        </Field>
    );
}
