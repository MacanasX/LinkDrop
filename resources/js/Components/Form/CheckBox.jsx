import { SiteLayout } from '@/Layouts/SiteLayout.jsx';
import Label from '@/Components/Form/Label.jsx';
import clsx from 'clsx';
import Error from '@/Components/Form/Error.jsx';
import Field from '@/Components/Form/Field.jsx';
import { Input as HeadlessInput } from '@headlessui/react';

export function CheckBox({
    id,
    label,
    name,
    value,
    required,
    errors,
    placeholder,
    onChange = () => {},
    classNames,
    direction,
    ...props
}) {
    return (
        <Field direction={direction}>
            <Label htmlFor={name} required={required}>
                {label}
            </Label>
            <HeadlessInput
                id={id || name}
                name={name}
                type='checkbox'
                checked={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-label={name}
                className={clsx(
                    'w-5 h-5',
                    { 'border-red-500': errors },
                    classNames,
                )}
                {...props}
            />

            {!!errors && <Error>{errors}</Error>}
        </Field>
    );
}

export default CheckBox;
