import { Menu, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import { Link, usePage } from '@inertiajs/react';

export function HeaderMenu() {
    const { user } = usePage().props;

    return (
        <Menu as='div' className='relative z-50 '>
            <Menu.Button className='cursor-pointer group p-2 rounded'>
                <Icon
                    path={mdiMenu}
                    size={1.5}
                    className='text-gray-600 group-hover:text-blue-500'
                />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
            >
                <MenuItems className='absolute flex flex-col items-start  right-0  m-2 w-48 rounded text-white  border border-gray-200 shadow-lg focus:outline-none bg-gray-800'>
                    <MenuItem>
                        <Link
                            href='/spotlight'
                            className='w-full px-4 py-2 data-focus:bg-blue-500 '
                        >
                            Spotlight
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href='/faq'
                            className='w-full border-t px-4 py-2 data-focus:bg-blue-500 '
                        >
                            FAQ
                        </Link>
                    </MenuItem>
                    {user ? (
                        <>
                            <MenuItem>
                                <Link
                                    href='/profile'
                                    as='button'
                                    className='w-full px-4 py-2  text-left border-t border-white  data-focus:bg-blue-500 hover:cursor-pointer'
                                >
                                    Profile
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link
                                    href='/logout'
                                    method='post'
                                    as='button'
                                    className='w-full px-4 py-2  text-left border-t border-white  data-focus:bg-blue-500 hover:cursor-pointer'
                                >
                                    Logout
                                </Link>
                            </MenuItem>
                        </>
                    ) : null}
                </MenuItems>
            </Transition>
        </Menu>
    );
}
