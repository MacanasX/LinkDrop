import clsx from 'clsx';
import Field from './Field';
import Label from './Label';
import Error from './Error';
import { Input as HeadlessInput } from '@headlessui/react';

export function NumberInput({
    id,
    label,
    name,
    value,
    required,
    errors,
    placeholder,
    onChange = () => {},
    classNames,
    ...props
}) {
    return (
        <Field>
            <Label htmlFor={name} required={required}>
                {label}
            </Label>
            <HeadlessInput
                id={id || name}
                name={name}
                type='number'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-label={name}
                className={clsx(
                    'w-full text-white h-10 px-3 text-base border border-solid border-gray-600 bg-gray-800 rounded-lg',
                    { 'border-red-500': errors },
                    classNames,
                )}
                {...props}
            />
            {!!errors && <Error>{errors}</Error>}
        </Field>
    );
}
