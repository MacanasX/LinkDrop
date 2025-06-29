import { SiteLayout } from '@/Layouts/SiteLayout.jsx';
import { TextCard } from '@/Components/Media/TextCard.jsx';
import { FileCard } from '@/Components/Media/FileCard.jsx';
import { useForm, usePage } from '@inertiajs/react';
import { Input } from '@/Components/Form/Input.jsx';

export default function Show({ link }) {
    if (link?.password && !link?.accessGranted) {
        return <PasswordPrompt slug={link.slug} />;
    }
    const Card = link.type === 'text' ? TextCard : FileCard;
    return <Card link={link} />;
}

function PasswordPrompt({ slug }) {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/links/${slug}/verify`);
    };

    return (
        <div className='max-w-md mx-auto mt-10 p-4  rounded-2xl   shadow-xl shadow-white/5 md:border'>
            <h2 className='text-xl font-bold mb-4'>
                This link is password protected
            </h2>
            <form onSubmit={submit}>
                <Input
                    type='password'
                    placeholder='Enter password'
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    errors={errors.password}
                />

                <button
                    type='submit'
                    disabled={processing}
                    className='bg-blue-500 text-white px-4 py-2 my-2 rounded hover:bg-blue-800 hover:cursor-pointer'
                >
                    Confirm
                </button>
            </form>
        </div>
    );
}

Show.layout = (page) => {
    const { link, appUrl } = page.props;

    return (
        <SiteLayout
            title={`LinkDrop - ${link?.slug}`}
            robots={
                link?.public && link?.type === 'file '
                    ? 'index, follow'
                    : 'noindex, nofollow'
            }
            canonical={`${appUrl}/${link?.slug}`}
        >
            {page}
        </SiteLayout>
    );
};
