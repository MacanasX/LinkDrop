import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './bootstrap';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <App {...props} />
                <ToastContainer
                    theme='dark'
                    position='top-right'
                    autoClose={2000}
                />
            </>,
        );
    },
});
