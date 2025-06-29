import { toast } from 'react-toastify';
import { AccessDisclaimer } from '@/Components/Media/AccessDisclaimer.jsx';
import { Button } from '@/Components/Form/Button.jsx';
import { Stats } from '@/Components/Media/Stats.jsx';

export function TextCard({
    link: { data, accessibleOnce, accessLimit, accessCount, expiresAt },
}) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(data);
        toast.info('Copied.');
    };

    const downloadAsTextFile = () => {
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.split(' ')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center'>
            <div className='w-full max-w-md p-4 text-center space-y-4'>
                <article
                    aria-label='Text'
                    className='bg-gray-600 shadow-sm border text-white border-gray-200 p-6 rounded-2xl min-h-[10rem] max-h-[25rem] overflow-auto text-left font-sans text-base leading-relaxed'
                >
                    {data}
                </article>

                {accessibleOnce && <AccessDisclaimer />}

                <div className='flex justify-center'>
                    <Stats
                        accessLimit={accessLimit}
                        accessCount={accessCount}
                        expiresAt={expiresAt}
                        dataLength={data.length}
                    />
                </div>

                <div className='flex justify-center gap-3'>
                    <Button onClick={copyToClipboard}>Copy</Button>
                    <Button variant='outline' onClick={downloadAsTextFile}>
                        Download
                    </Button>
                </div>
            </div>
        </div>
    );
}
