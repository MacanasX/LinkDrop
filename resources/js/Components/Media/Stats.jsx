export function Stats({ accessLimit, accessCount, expiresAt, dataLength }) {
    return (
        <div className='text-md flex flex-col text-gray-300 mt-3 text-left gap-y-2 font-bold'>
            {expiresAt && <div>Expires at: {expiresAt}</div>}
            {accessLimit && accessLimit > 1 && (
                <div>Access Limit: {accessLimit - accessCount} left </div>
            )}
            {dataLength && <div>Text length: {dataLength}</div>}
        </div>
    );
}
