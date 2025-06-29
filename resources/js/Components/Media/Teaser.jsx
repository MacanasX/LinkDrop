import React from 'react';
import { Text } from '@/Components/Media/Text.jsx';
import { File } from '@/Components/Media/File.jsx';

export default function Teaser({ type, url, filename, data, ...props }) {
    return (
        <div className='flex flex-col gap-y-2 justify-center items-center  rounded-2xl'>
            <div className='p-4 shadow flex flex-col md:flex-row  items-center gap-4 text-white text-center '>
                {type === 'text' ? (
                    <Text data={data} />
                ) : (
                    <File url={url} filename={filename} />
                )}
            </div>
        </div>
    );
}
