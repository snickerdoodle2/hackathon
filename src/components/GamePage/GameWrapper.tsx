import { useContext } from 'react';
import { type NavigateFunction, useNavigate } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import GameHelper from './GameHelper';
import { Button } from '../ui/button';
import { type GameTask } from '@/lib/section';
import { useToast } from '../ui/use-toast';
import { StorageContext } from '@/components/Storage/storageContext.tsx';

interface Props {
    navigate: NavigateFunction;
    fallbackRoute: string;
    task: GameTask;
}

export default function GameWrapper({ navigate, fallbackRoute, task }: Props) {
    const navi = useNavigate();
    const { toast } = useToast();

    const context = useContext(StorageContext);

    if (context === undefined) {
        throw new Error('useStorage must be used within a StorageProvider');
    }

    const { points, setPoints } = context;

    function onFinish(gained: number) {
        setPoints(points + gained);
        toast({
            title: 'Gratulacje!',
            description: `Zdobyłeś ${gained} punktów! Zaraz wrócisz na poprzednią stronę...`,
        });
        setTimeout(() => {
            navi(-1);
        }, 2000);
    }

    return (
        <Card className='max-h-full h-full max-w-full bg-background/90'>
            <div className='flex justify-center items-center h-32 text-white'>
                <Card className='m-0 animated-background text-white bg-gradient-to-br from-orange-300 to-orange-600 to-90% shadow-[#1f1f1f] shadow-xl border-none'>
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
        </Card>
    );
}
