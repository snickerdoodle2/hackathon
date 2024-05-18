//generat ebasic page to disiplay components
//TODO: import Games from '../components/game';
import { useNavigate, useParams } from 'react-router-dom';
import Section from '../lib/section';
import React, { useState, useEffect } from 'react';

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import Nono from '@/components/minigames/Nono';
import { Wordle } from '@/components/minigames/wordle/wordle';

function Loading() {
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div role='status'>
                <svg
                    aria-hidden='true'
                    className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                    />
                    <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                    />
                </svg>
                <span className='sr-only'>Loading...</span>
            </div>
        </div>
    );
}

function GameWrapper(navigate, fallbackRoute, sectionId, task, content) {
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
                {content}
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
        </div>
    );
}

const GameHelper = (type: string, onFinish: () => void) => {
    console.log(type);
    if (type === 'Nonogram') return <Nono onFinish={onFinish} />;
    if (type === 'Wordle') return <Wordle onFinish={onFinish} />;
    return <p>Game not found :(</p>;
};

export const GamePage = () => {
    const navigate = useNavigate();
    const { sectionId, taskId } = useParams();

    const [section, setSection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const sectionInstance = await Section.createInstance(sectionId);
                setSection(sectionInstance);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, [sectionId]);

    if (loading) {
        return Loading();
    }

    if (error) {
        return <div>Error loading configuration: {error.message}</div>;
    }

    if (!section) {
        return <div>Configuration not found</div>;
    }

    const task = section.getTaskById(taskId);

    const fallbackRoute = `/sections/${sectionId}/tasks`;

    return GameWrapper(
        navigate,
        fallbackRoute,
        sectionId,
        task,
        GameHelper(task.game.type, () => alert('xd'))
    );
};
