import Logo from '@/Components/Logo.jsx';
import { HeaderMenu } from '@/Components/HeaderMenu.jsx';

export default function Header() {
    return (
        <header className='w-full h-20 flex items-center justify-between border-b border-neutral-200 '>
            <Logo />
            <HeaderMenu />
        </header>
    );
}
