import { Link, useForm, usePage } from '@inertiajs/react';
import Icon from '@mdi/react';
import { mdiAlert } from '@mdi/js';
import { toast } from 'react-toastify';
import { SiteLayout } from '@/Layouts/SiteLayout.jsx';
import { RadioButton } from '@/Components/Form/RadioButton.jsx';
import { Textarea } from '@/Components/Form/TextArea.jsx';
import { FileInput } from '@/Components/Form/FileInput.jsx';
import { Button } from '@/Components/Form/Button.jsx';
import { Tooltip } from '@/Components/ToolTip.jsx';
import { DateInput } from '@/Components/Form/DateInput.jsx';
import { NumberInput } from '@/Components/Form/NumberInput.jsx';
import { useEffect } from 'react';
import CheckBox from '@/Components/Form/CheckBox.jsx';
import { Input } from '@/Components/Form/Input.jsx';

export default function Index() {
    const { flash, user } = usePage().props;
    const initialFormState = {
        type: 'file',
        file: null,
        text: '',
        access_limit: '',
        expires_at: '',
        public: false,
        password: '',
    };
    const {
        data: formData,
        setData,
        post,
        processing,
        errors,
        reset: resetFormData,
        transform,
        clearErrors,
    } = useForm(initialFormState);

    transform((data) => {
        if (data.type === 'file') {
            data.text = '';
        } else if (data.type === 'text') {
            data.file = null;
        }
        return data;
    });
    const submit = (e) => {
        e.preventDefault();
        post('/links', {
            preserveState: 'errors',
            onSuccess: () => {
                clearErrors();
                resetFormData();
                toast.success('Link generated successfully.', {
                    toastId: 'link-success',
                });
            },
            onError: () =>
                toast.error('Something went wrong.', {
                    toastId: 'link-error',
                }),
        });
    };

    useEffect(() => {
        console.log('formData updated:', formData);
    }, [formData]);

    useEffect(() => {
        toast.info(flash?.message?.auth);
    }, [flash?.message?.auth]);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            const timer = setTimeout(() => {
                clearErrors();
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [errors, clearErrors]);

    const copyToClipboard = () => {
        if (flash.message.url) {
            navigator.clipboard.writeText(flash.message.url);
            toast.info('Copied.');
        }
    };

    return (
        <div className='min-h-screen flex flex-col items-center '>
            <h1 className={'text-center text-2xl m-5 '}>
                Share data with ease.
            </h1>
            <p className='text-center text-gray-400 mb-4 max-w-xl '>
                Use LinkDrop to share a file or a piece of text securely. Just
                choose a type, optionally set an access limit or expiration
                date, and generate a one-time link that you can send to others.
                No signup required.
            </p>
            <form
                onSubmit={submit}
                className='p-10 m-2 w-full lg:w-1/2 rounded-2xl   shadow-xl shadow-white/5 md:border'
            >
                <div className='flex flex-col gap-2 '>
                    <p>Choose your type of Data</p>
                    <div className='flex justify-between gap-x-5  w-1/7'>
                        <RadioButton
                            label='File'
                            name='type'
                            value='file'
                            errors={errors.type}
                            checked={formData?.type === 'file'}
                            onChange={(e) => setData('type', e.target.value)}
                        />

                        <RadioButton
                            label='Text'
                            name='type'
                            value='text'
                            errors={errors.type}
                            checked={formData?.type === 'text'}
                            onChange={(e) => setData('type', e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2 mt-4 relative'>
                    <NumberInput
                        label='Access Limit'
                        value={formData.access_limit}
                        id={formData.access_limit}
                        placeholder='Limit the access'
                        min='0'
                        classNames='relative'
                        onChange={(e) =>
                            setData('access_limit', e.target.value)
                        }
                    />
                    <Tooltip
                        classNames='top-0 left-24'
                        tooltipText='Limit how many times this link can be used. The link expires either when the access limit is reached or the expiration date happens, whichever comes first. '
                    />
                    <DateInput
                        label='Expire Date'
                        id='Expire Date'
                        value={formData.expires_at}
                        onChange={(e) => setData('expires_at', e.target.value)}
                    />
                    <Tooltip
                        classNames='top-21 left-24'
                        tooltipText='Set an expiration date for the link. The link expires either when the access limit is reached or the expiration date happens, whichever comes first. '
                    />
                    {formData.type === 'text' ? (
                        <Textarea
                            label='Text-Data'
                            placeholder='Your data'
                            value={formData.text}
                            id='Text-Data'
                            errors={errors.text}
                            onChange={(e) => setData('text', e.target.value)}
                        />
                    ) : (
                        <FileInput
                            label='File Upload'
                            id='File Upload'
                            value={formData.file}
                            errors={errors.file}
                            onChange={(e) => setData('file', e.target.files[0])}
                        />
                    )}
                    {formData.type === 'file' ? (
                        <>
                            <CheckBox
                                label='Public Access'
                                name='Public Access'
                                value={formData.public}
                                errors={errors.public}
                                checked={formData?.public}
                                onChange={(e) =>
                                    setData('public', e.target.checked)
                                }
                            />
                            {!formData.public && (
                                <Input
                                    type='password'
                                    label='Password'
                                    name='password'
                                    placeholder='Optional Password'
                                    value={formData.password}
                                    errors={errors.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                            )}
                        </>
                    ) : null}
                </div>

                <div className='flex flex-col justify-center items-center text-center mt-4 gap-y-2'>
                    <Button disabled={processing} onClick={submit}>
                        Create Link
                    </Button>
                    {formData.public && formData.type === 'file' ? (
                        <div className={'flex justify-center'}>
                            <Icon
                                className='text-yellow-400 mr-1'
                                path={mdiAlert}
                                size={1}
                            />
                            <p>
                                This link will be public and may appear in the
                                Spotlight ranking unless you set it private.
                            </p>
                        </div>
                    ) : null}
                </div>
            </form>

            {flash?.message?.url && (
                <div className='m-6 p-4  rounded bg-gray-800 text-white w-full md:w-1/2 gap-2  flex flex-col md:flex-row justify-between items-center '>
                    <a
                        href={flash?.message?.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline break-all hover:text-blue-400'
                    >
                        {flash?.message?.url}
                    </a>
                    <Button onClick={copyToClipboard}>Copy</Button>
                </div>
            )}
            {!user ? (
                <div className='mt-4 text-gray-300'>
                    <Link
                        href='/login'
                        className='underline hover:text-blue-600'
                    >
                        Login
                    </Link>{' '}
                    or{' '}
                    <Link
                        href='/register'
                        className='underline hover:text-blue-600'
                    >
                        Register
                    </Link>
                </div>
            ) : null}
        </div>
    );
}

Index.layout = (page) => (
    <SiteLayout
        robots='index, follow'
        canonical={page.props.appUrl}
        title='LinkDrop - share data with ease'
        children={page}
    />
);
