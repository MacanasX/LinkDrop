import { usePage } from '@inertiajs/react';

export default function Footer() {
    const { year } = usePage().props;

    return (
        <footer className='w-full flex  items-center border-t border-white  justify-center  @container/footer'>
            <p className='text-sm text-white m-2 p-2'>
                © {year} LinkDrop - All rights reserved
            </p>
        </footer>
    );
}
