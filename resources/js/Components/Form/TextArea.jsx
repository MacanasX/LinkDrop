import { Textarea as HeadlessTextarea } from '@headlessui/react';
import clsx from 'clsx';
import Field from './Field';
import Label from './Label';
import Error from './Error';

export function Textarea({
    id,
    name,
    value,
    label,
    required,
    placeholder,
    children,
    errors,
    ...props
}) {
    return (
        <Field>
            <Label htmlFor={name} required={required}>
                {label}
            </Label>
            <HeadlessTextarea
                id={id || name}
                name={name}
                aria-label={name}
                value={value}
                placeholder={placeholder}
                className={clsx(
                    'w-full h-32 border border-solid border-gray-600 bg-gray-800 rounded-lg flex items-center justify-center p-4 resize-none',
                    { 'border-red-500': errors },
                )}
                {...props}
            >
                {children}
            </HeadlessTextarea>
            {!!errors && <Error>{errors}</Error>}
        </Field>
    );
}
