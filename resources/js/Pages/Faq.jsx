import { Disclosure } from '@headlessui/react';
import Icon from '@mdi/react';
import { mdiChevronUp } from '@mdi/js';
import { SiteLayout } from '@/Layouts/SiteLayout.jsx';
import { usePage } from '@inertiajs/react';

export default function Faq() {
    const faqData = [
        {
            category: 'General',
            items: [
                {
                    question: 'What is LinkDrop?',
                    answer: 'LinkDrop lets you share text or files via a link with optional expiration or access limits.',
                },
                {
                    question: 'Is it free?',
                    answer: 'Yes, LinkDrop is completely free.',
                },
            ],
        },
        {
            category: 'Privacy & Security',
            items: [
                {
                    question: 'Are links private?',
                    answer: [
                        'Only file links can be public and listed in the Spotlight. Text links are always private and never publicly indexed.',
                        'You can choose the visibility for file links. Public file links are listed in the Spotlight, while private file links are not indexed or exposed.',
                        'You can even protect file links with a password.',
                    ],
                },
                {
                    question: 'Do you store my data forever?',
                    answer: [
                        'Links with an expiration date or access limit are deleted once those limits are reached.',
                        'Anonymous private links are deleted after 1 year.',
                        'Anonymous public links are deleted after 2 years.',
                        'User-owned private links are deleted after 2 years.',
                        'User-owned public links are deleted after 3 years.',
                    ],
                },
            ],
        },
    ];

    return (
        <div className='max-w-4xl mx-auto p-6'>
            <h1 className='text-3xl font-bold text-center mb-8'>
                Frequently Asked Questions
            </h1>
            {faqData.map((section, i) => (
                <div key={i} className='mb-6'>
                    <h2 className='text-xl font-semibold mb-3'>
                        {section.category}
                    </h2>
                    <div className='space-y-2'>
                        {section.items.map((item, j) => (
                            <Disclosure key={j}>
                                {({ open }) => (
                                    <div className='border border-gray-700 rounded-lg'>
                                        <Disclosure.Button className='flex w-full justify-between items-center px-4 py-2 text-left text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg'>
                                            <span>{item.question}</span>
                                            <Icon
                                                path={mdiChevronUp}
                                                size={1}
                                                className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className='px-4 py-3 text-sm text-gray-300 bg-gray-900 rounded-b-lg'>
                                            {Array.isArray(item.answer) ? (
                                                <ul className='list-disc pl-5 space-y-1'>
                                                    {item.answer.map(
                                                        (line, idx) => (
                                                            <li key={idx}>
                                                                {line}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            ) : (
                                                item.answer
                                            )}
                                        </Disclosure.Panel>
                                    </div>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

Faq.layout = (page) => (
    <SiteLayout
        canonical={page.props.appUrl + '/faq'}
        robots='index, follow'
        title='LinkDrop - FAQ'
        children={page}
    />
);
