import React, { useState } from 'react';
import Icon from '@mdi/react';
import {
    mdiFilePdfBox,
    mdiFileDocumentOutline,
    mdiTextLong,
    mdiFolder,
} from '@mdi/js';
import { AccessDisclaimer } from '@/Components/Media/AccessDisclaimer.jsx';
import { Stats } from '@/Components/Media/Stats.jsx';

const docIcon = <Icon path={mdiFileDocumentOutline} size={1} />;

const fileIcons = {
    pdf: <Icon path={mdiFilePdfBox} size={10} />,
    doc: docIcon,
    docx: docIcon,
    xls: docIcon,
    xlsx: docIcon,
    txt: <Icon path={mdiTextLong} size={10} />,
    default: <Icon path={mdiFolder} size={10} />,
};

export function FileCard({
    link: {
        accessibleOnce,
        accessLimit,
        accessCount,
        expiresAt,
        media: { fileName, url, mimeType, createdAt },
    },
}) {
    const ext = fileName?.split('.').pop()?.toLowerCase() || '';
    const isImage = mimeType.includes('image');
    const [loading, setLoading] = useState(true);

    return (
        <div className='min-h-screen w-full flex items-center justify-center'>
            <div className='flex flex-col justify-center items-center'>
                {isImage ? (
                    <div className='w-full flex flex-col overflow-hidden relative h-[20rem]'>
                        {loading && (
                            <div className='absolute inset-0 bg-gray-300 animate-pulse'></div>
                        )}
                        <img
                            src={url}
                            alt={fileName}
                            className='w-full h-full object-cover'
                            loading='lazy'
                            onLoad={() => setLoading(false)}
                            onError={() => setLoading(false)}
                        />
                    </div>
                ) : (
                    <div className='text-5xl flex items-center justify-center   text-white border border-white rounded-2xl'>
                        {fileIcons[ext] || fileIcons.default}
                    </div>
                )}

                <div
                    className='mt-2 text-2xl font-bold break-words text-center max-w-[90vw] sm:max-w-sm'
                    title={fileName}
                >
                    {fileName}
                </div>

                <Stats
                    accessLimit={accessLimit}
                    accessCount={accessCount}
                    expiresAt={expiresAt}
                />

                <a
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mt-2 inline-block text-2xl text-blue-600 hover:underline '
                    download
                >
                    Open / Download
                </a>
                {accessibleOnce && <AccessDisclaimer />}
            </div>
        </div>
    );
}
