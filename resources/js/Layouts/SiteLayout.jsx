import { BaseLayout } from '@/Layouts/BaseLayout.jsx';
import Header from '@/Components/Header.jsx';
import Footer from '@/Components/Footer.jsx';

export function SiteLayout({
    title,
    description,
    robots,
    children,
    canonical,
}) {
    return (
        <BaseLayout
            title={title}
            robots={robots}
            description={description}
            canonical={canonical}
        >
            <Header />
            <main>{children}</main>
            <Footer />
        </BaseLayout>
    );
}
