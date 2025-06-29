import { Input as HeadlessFileInput } from '@headlessui/react';
import clsx from 'clsx';
import Field from '@/Components/Form/Field.jsx';
import Label from '@/Components/Form/Label.jsx';
import Error from '@/Components/Form/Error.jsx';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function FileInput({
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
    const [fileInformation, setFileInformation] = useState({
        name: 'No File selected',
        size: null,
    });
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    const handleChange = (e) => {
        const file = e.target.files[0];

        if (file && file.size > MAX_FILE_SIZE) {
            toast.error('The selected file is too big.');
            e.target.value = null;
            setFileInformation({
                name: 'No File selected',
                size: null,
            });
            return;
        }
        setFileInformation(
            file ? { name: file.name, size: file.size } : 'No File selected',
        );
        onChange(e);
    };

    useEffect(() => {
        if (value?.name) {
            setFileInformation({
                name: value.name,
                size: value?.size || null,
            });
        } else {
            setFileInformation({
                name: 'No File selected',
                size: null,
            });
        }
    }, [value]);

    return (
        <Field>
            <Label htmlFor={name} required={required}>
                {label}
            </Label>
            <div className='flex flex-col  items-start  md:flex-row md:items-center gap-3'>
                <div className='flex gap-x-6 justify-center items-center'>
                    <label
                        htmlFor={id || name}
                        className='px-4 py-2 text-sm font-medium relative text-white bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition'
                    >
                        Select file
                    </label>
                    <div className='flex gap-x-3 justify-center items-center'>
                        <span className='text-sm text-gray-400  truncate max-w-[200px]'>
                            {fileInformation.name}
                        </span>
                        <span
                            className={clsx(
                                'text-xs',
                                fileInformation?.size
                                    ? fileInformation.size / (1024 * 1024) <=
                                      MAX_FILE_SIZE
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                    : '',
                            )}
                        >
                            {fileInformation?.size
                                ? fileInformation.size < 1024 * 1024
                                    ? `${(fileInformation.size / 1024).toFixed(0)} KB`
                                    : `${(fileInformation.size / (1024 * 1024)).toFixed(2)} MB`
                                : ''}
                        </span>
                    </div>
                </div>

                <HeadlessFileInput
                    id={id || name}
                    hidden
                    name={name}
                    type={'file'}
                    aria-label={name}
                    className={clsx(
                        'w-full h-10 text-white  text-base border border-solid  border-gray-600 bg-gray-800  rounded-lg',
                        { 'border-red-500': errors },
                    )}
                    onChange={handleChange}
                    placeholder={placeholder}
                    {...props}
                />
            </div>

            {!!errors && <Error>{errors}</Error>}
        </Field>
    );
}
