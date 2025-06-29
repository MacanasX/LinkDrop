import { Input as HeadlessInput } from '@headlessui/react';
import Field from '@/Components/Form/Field.jsx';
import Label from '@/Components/Form/Label.jsx';
import Error from '@/Components/Form/Error.jsx';

export function RadioButton({
    id,
    label,
    name,
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
                type={'radio'}
                aria-label={name}
                onChange={onChange}
                placeholder={placeholder}
                {...props}
            />

            {!!errors && <Error>{errors}</Error>}
        </Field>
    );
}
