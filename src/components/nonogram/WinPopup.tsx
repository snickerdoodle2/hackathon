import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface Props {
    top: number;
    left: number;
    opacity: number;
    count: number;
    isPlaying: boolean;
    circleColor: string;
    countdownLength: number;
}

export default function WinPopup({
    top,
    left,
    opacity,
    count,
    isPlaying,
    circleColor,
    countdownLength,
}: Props) {
    return (
        <div
            style={{
                textAlign: 'center',
                width: 200,
                height: 140,
                justifyContent: 'space-around',
                flexDirection: 'column',
                display: 'flex',
                borderRadius: 20,
                borderWidth: 2,
                position: 'absolute',
                backgroundColor: 'white',
                top: top,
                left: left,
                transition: 'opacity 1s ease-in-out',
                opacity: opacity,
                pointerEvents: 'none',
                alignItems: 'center',
            }}
        >
            Brawo! <br />
            Powrót do strony głównej za <br />
            {count}
            <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={countdownLength + 1}
                colors={`#${circleColor}`}
                strokeWidth={6}
                size={40}
            >
                {({}) => count}
            </CountdownCircleTimer>
        </div>
    );
}
