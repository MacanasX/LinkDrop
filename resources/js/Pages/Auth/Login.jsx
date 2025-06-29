import { SiteLayout } from '@/Layouts/SiteLayout.jsx';
import { useForm, usePage } from '@inertiajs/react';
import { Input } from '@/Components/Form/Input.jsx';
import { Loader } from '@/Components/Loader.jsx';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className='min-h-screen flex  justify-center mt-15'>
            <div className='w-full h-1/2 sm:max-w-md p-6 rounded-2xl   shadow-xl shadow-white/5 md:border '>
                <h1 className='text-2xl font-bold mb-4'>Login</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <Input
                        required
                        type='email'
                        label='Email'
                        name={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        errors={errors.email}
                    />
                    <Input
                        required
                        type='password'
                        label='Password'
                        name={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        errors={errors.password}
                    />
                    <button
                        className='bg-blue-600 rounded p-2 text-white hover:bg-blue-800 hover:cursor-pointer disabled:opacity-50'
                        type='submit'
                        disabled={processing}
                    >
                        {processing ? (
                            <div className='flex justify-center items-center'>
                                <Loader />
                            </div>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
Login.layout = (page) => (
    <SiteLayout
        title='LinkDrop - Login'
        robots='noindex, nofollow'
        canonical={page.props.appUrl + '/login'}
        children={page}
    />
);
