import { SiteLayout } from '@/Layouts/SiteLayout.jsx';
import { usePage } from '@inertiajs/react';
import { Button } from '@/Components/Form/Button.jsx';
import { DeleteAccount } from '@/Components/DeleteAccount.jsx';

export default function Profile() {
    const { user } = usePage().props;

    if (!user) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <p>Loading user data...</p>
            </div>
        );
    }

    return (
        <div className='min-h-screen flex flex-col items-center '>
            <div className='p-8 m-4 w-full max-w-xl rounded-2xl flex flex-col gap-4 shadow-xl shadow-white/5  text-white   '>
                <h1 className='text-3xl font-bold'>Profile</h1>

                <div className='flex justify-between'>
                    <span className='text-gray-400'>Name:</span>
                    <span>{user.name}</span>
                </div>

                <div className='flex justify-between'>
                    <span className='text-gray-400'>Email:</span>
                    <span>{user.email}</span>
                </div>

                <div className='flex justify-between'>
                    <span className='text-gray-400'>Joined:</span>
                    <span>{user.createdAt}</span>
                </div>

                <div className='flex justify-between'>
                    <span className='text-gray-400'>Number of Links:</span>
                    <span>{user.numberOfLinks}</span>
                </div>
            </div>
            <DeleteAccount />
        </div>
    );
}

Profile.layout = (page) => (
    <SiteLayout
        robots='noindex, nofollow'
        canonical={page.props.appUrl + '/profile'}
        title='LinkDrop - Profile'
        children={page}
    />
);
