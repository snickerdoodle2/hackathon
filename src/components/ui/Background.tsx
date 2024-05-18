import * as React from 'react';

const Background = ({ children }) => {
    return (
        <div
            className='
    bg-gradient-to-br from-sky-500 from-10% via-blue-700 via-30% to-purple-500 to-90% h-screen'
        >
            <div className="h-screen w-screen absolute bg-[url('/assets/Starts.png')]"></div>
            <div className='relative z-10 h-screen flex flex-col'>
                {children}
            </div>
        </div>
    );
};

export default Background;
