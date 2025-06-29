import { useState } from 'react';
import { Button } from '@/Components/Form/Button.jsx';
import {
    Description,
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { router } from '@inertiajs/react';

export function DeleteAccount() {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteLinks, setDeleteLinks] = useState(false);

    function handleDelete() {
        router.delete(`/profile?deleteLinks=${deleteLinks}`);
        setIsOpen(false);
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Delete Account</Button>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className='relative z-50'
            >
                <DialogBackdrop className='fixed inset-0 ' />
                <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
                    <DialogPanel className='max-w-lg space-y-4 border rounded-2xl p-12'>
                        <DialogTitle className='font-bold text-2xl'>
                            Delete account
                        </DialogTitle>
                        <Description>
                            This action is <strong>permanent</strong> and cannot
                            be undone.
                        </Description>
                        <p>
                            Are you sure you want to delete your account?{' '}
                            {deleteLinks
                                ? 'All your data, including links will be permanently removed.'
                                : 'Your account will be deleted, but your links will be preserved.'}
                        </p>
                        <label className='flex items-center gap-3'>
                            <input
                                type='checkbox'
                                checked={deleteLinks}
                                onChange={() => setDeleteLinks(!deleteLinks)}
                                className='h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500'
                            />
                            <span className='select-none'>
                                Remove links tied to my account
                            </span>
                        </label>
                        <div className='flex gap-4'>
                            <Button onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>

                            <Button onClick={() => handleDelete()}>
                                Delete
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
