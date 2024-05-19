import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import GameHelper from './GameHelper';
import { Button } from '../ui/button';
import WinPopup from '../nonogram/WinPopup';

interface Props {
    navigate: any;
    fallbackRoute: any;
    sectionId: any;
    task: any;
}

export default function GameWrapper({
    navigate,
    fallbackRoute,
    sectionId,
    task,
}: Props) {
    const [shouldShow, setShouldShow] = useState<boolean>(false);
    const countdownLength = 3;
    const [count, setCount] = useState<number>(1);
    const [points, setPoints] = useState<number>(0);

    const navi = useNavigate();

    function onFinish(gained: number) {
        setShouldShow(true);
        setPoints((points) => points + gained);
        countdown(countdownLength);
    }

    function countdown(num: number) {
        console.log(num)
        setCount(num);
        if (num == 0) {
            setTimeout(() => navi('/'), 1000);
        }
        setTimeout(() => countdown(num - 1), 1000);
    }

    return (
        <div className='h-screen'>
            <div className='flex justify-center items-center h-32 text-white'>
                <Card
                    className='m-2'
                    style={{
                        background:
                            'linear-gradient(to right, #F48535, #F4A435)',
                    }}
                >
                    <CardHeader>
                        <CardTitle>{task.title}</CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            <div
                className='flex flex-col justify-center items-center flex-grow'
                style={{ height: 'calc(100% - 12rem)' }}
            >
                <GameHelper type={task.game.type} onFinish={onFinish} />
            </div>
            <div className='flex justify-center items-center h-16 text-white'>
                <Button
                    className='h-max'
                    style={{
                        background:
                            'linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))',
                    }}
                    onClick={() => navigate(fallbackRoute)}
                >
                    Stop Task
                </Button>
            </div>
            <WinPopup
                top={200}
                left={300}
                opacity={shouldShow ? 1 : 0}
                isPlaying={shouldShow}
                countdownLength={countdownLength}
                circleColor={'ffc20e'}
                count={count}
            />
        </div>
    );
}
