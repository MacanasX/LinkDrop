import React from 'react';
import Icon from '@mdi/react';
import {
    mdiFilePdfBox,
    mdiFileDocumentOutline,
    mdiTextLong,
    mdiFolder,
} from '@mdi/js';

const fileIcons = {
    pdf: <Icon path={mdiFilePdfBox} size={1} />,
    doc: <Icon path={mdiFileDocumentOutline} size={1} />,
    docx: <Icon path={mdiFileDocumentOutline} size={1} />,
    xls: <Icon path={mdiFileDocumentOutline} size={1} />,
    xlsx: <Icon path={mdiFileDocumentOutline} size={1} />,
    txt: <Icon path={mdiTextLong} size={1} />,
    default: <Icon path={mdiFolder} size={1} />,
};

export function File({ url, filename }) {
    const ext = getFileExtension(filename);
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext);

    return (
        <div className='flex-1 flex flex-col'>
            {isImage ? (
                <div className='w-full flex flex-col overflow-hidden relative aspect-square bg-white'>
                    <img
                        src={url}
                        alt={filename}
                        className='w-full h-full object-cover'
                        loading='lazy'
                    />
                </div>
            ) : (
                <div className='text-5xl flex items-center justify-center bg-gray-200 rounded aspect-square'>
                    {fileIcons[ext] || fileIcons.default}
                </div>
            )}

            <div className='font-semibold truncate mt-2' title={filename}>
                {filename}
            </div>

            <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-2 inline-block text-blue-600 hover:underline text-sm'
                download
            >
                Open / Download
            </a>
        </div>
    );
}

function getFileExtension(filename) {
    return filename?.split('.').pop()?.toLowerCase() || '';
}
