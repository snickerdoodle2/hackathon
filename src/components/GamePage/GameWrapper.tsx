import { useContext, useEffect, useState } from 'react';
import { type NavigateFunction, useNavigate } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import GameHelper from './GameHelper';
import { Button } from '../ui/button';
import WinPopup from '../nonogram/WinPopup';
import { type GameTask } from '@/lib/section';
import { StorageContext } from '@/components/Storage/storageContext.tsx';

interface Props {
    navigate: NavigateFunction;
    fallbackRoute: string;
    task: GameTask;
}

export default function GameWrapper({ navigate, fallbackRoute, task }: Props) {
    const [shouldShow, setShouldShow] = useState<boolean>(false);
    const countdownLength = 3;
    const [count, setCount] = useState<number>(1);
    // const [points, setPoints] = useState<number>(0);

    const navi = useNavigate();

    const context = useContext(StorageContext);

    if (context === undefined) {
        throw new Error('useStorage must be used within a StorageProvider');
    }

    const { points, setPoints } = context;

    function onFinish(gained: number) {
        setShouldShow(true);
        setPoints(points + gained);
        countdown(countdownLength);
    }

    useEffect(() => console.log(points), [points]);

    function countdown(num: number) {
        console.log(num);
        setCount(num);
        if (num == 0) {
            setTimeout(() => navi(-1), 1000);
        }
        setTimeout(() => countdown(num - 1), 1000);
    }

    return (
        <div className='h-screen'>
            <div className='flex justify-center items-center h-32 text-white'>
                <Card
                    className='m-0 animated-background text-white bg-gradient-to-br from-orange-300 to-orange-600 to-90% shadow-[#1f1f1f] shadow-xl border-none'
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
