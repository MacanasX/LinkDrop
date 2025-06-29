import { router } from '@inertiajs/react';

export default function Logo() {
    return (
        <svg
            width='200'
            height='60'
            viewBox='0 0 200 60'
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => router.get('/')}
            className={'hover:cursor-pointer'}
        >
            <defs>
                <linearGradient
                    id='tealGradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='100%'
                >
                    <stop
                        offset='0%'
                        style={{ stopColor: '#20c997', stopOpacity: 1 }}
                    />
                    <stop
                        offset='100%'
                        style={{ stopColor: '#0ca678', stopOpacity: 1 }}
                    />
                </linearGradient>
            </defs>
            <text
                x='10'
                y='40'
                fontFamily='Segoe UI, Helvetica, Arial, sans-serif'
                fontSize='32'
                fontWeight='600'
                fill='white'
            >
                LinkDrop
            </text>
        </svg>
    );
}
