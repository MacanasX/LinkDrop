import Field from './Field';
import Label from './Label';
import Error from './Error';
import clsx from 'clsx';
import { Input as HeadlessFileInput } from '@headlessui/react';

export function DateInput({
    id,
    label,
    name,
    value,
    required,
    errors,
    placeholder,
    onChange = () => {},
    today = new Date().toLocaleDateString('en-CA'),
    ...props
}) {
    return (
        <Field>
            <Label htmlFor={name} required={required}>
                {label}
            </Label>
            <HeadlessFileInput
                id={id || name}
                name={name}
                type='date'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-label={name}
                min={today}
                className={clsx(
                    'w-full h-10 px-3 text-base border border-solid border-gray-600 bg-gray-800 rounded-lg',
                    { 'border-red-500': errors },
                )}
                {...props}
            />
            {!!errors && <Error>{errors}</Error>}
        </Field>
    );
}
