import React from 'react';

interface BackgroundProps {
    children: React.ReactNode;
    animationClass: string;
}

const Background = ({ children, animationClass }: BackgroundProps) => {
    return (
        <div
            className='animated-background2
    bg-gradient-to-br from-sky-500 from-10% via-blue-700 via-30% to-purple-500 to-90% h-svh flex flex-col overflow-clip'
        >
            <div
                className={`h-svh w-svw absolute bg-[url('/assets/Starts.png')] ${animationClass}`}
            >
                <img
                    src='/assets/satellite.png'
                    className='absolute top-[290px] animate-float'
                />
            </div>

            <div className='relative z-10 h-svh flex flex-col flex-1 py-12 px-6 font-poppins'>
                {children}
            </div>
        </div>
    );
};

export default Background;
