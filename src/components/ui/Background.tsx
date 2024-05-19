import React, { useState, useEffect } from 'react';

interface BackgroundProps {
    children: React.ReactNode;
    animationClass: string;
}

const Background = ({ children, animationClass }: BackgroundProps) => {

    return (
        <div
            className='animated-background2
    bg-gradient-to-br from-sky-500 from-10% via-blue-700 via-30% to-purple-500 to-90% h-screen flex flex-col overflow-clip'
        >
            <div
                className={`h-screen w-screen absolute bg-[url('/assets/Starts.png')] ${animationClass}`}
            ></div>
            <div className='relative z-10 h-screen flex flex-col flex-1 py-12 px-6'>
                {children}
            </div>
        </div>
    );
};

export default Background;
