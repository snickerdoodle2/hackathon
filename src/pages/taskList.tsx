import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover';
import './taskListStyles.css';
import { SteppedLineTo } from 'react-lineto';
import { MdOutlineTaskAlt } from 'react-icons/md';
import { MdOutlineGamepad } from 'react-icons/md';
import { MdInfoOutline } from 'react-icons/md';
import { FaRegStar } from 'react-icons/fa';
import { RiHome6Line } from 'react-icons/ri';
import { AiOutlineTrophy } from 'react-icons/ai';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

enum Option {
    Task = 'task',
    Info = 'info',
    Game = 'game',
}
interface Task {
    id: number;
    name: string;
    message: string;
    completed: boolean;
    shortText: string;
    option: Option;
}

const tasks: Task[] = [
    {
        id: 1,
        name: 'Task 1',
        message: 'Details about Task 1',
        completed: false,
        shortText: 'Regular Text',
        option: Option.Game,
    },
    {
        id: 2,
        name: 'Task 2',
        message: 'Details about Task 2',
        completed: false,
        shortText: 'Regular Text',
        option: Option.Task,
    },
    {
        id: 3,
        name: 'Task 3',
        message: 'Details about Task 3',
        completed: true,
        shortText: 'Regular Text',
        option: Option.Info,
    },
];
const score: number = 123;
const taskListTitle: string = 'Title';
const taskListDescription: string = 'Some kind of description';

const TaskLadder: React.FC = () => {
    const [clickedButton, setClickedButton] = useState<number | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [starred, setStarred] = useState(false);

    const getIcon = (option: Option, task: Task) => {
        if (option === Option.Task) {
            return (
                <MdOutlineTaskAlt
                    size={20}
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        color:
                            clickedButton === task.id || task.completed
                                ? 'white'
                                : 'black',
                    }}
                />
            );
        } else if (option === Option.Info) {
            return (
                <MdInfoOutline
                    size={20}
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        color:
                            clickedButton === task.id || task.completed
                                ? 'white'
                                : 'black',
                    }}
                />
            );
        } else if (option === Option.Game) {
            return (
                <MdOutlineGamepad
                    size={20}
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        color:
                            clickedButton === task.id || task.completed
                                ? 'white'
                                : 'black',
                    }}
                />
            );
        }
    };

    const handleButtonClick = (taskId: number) => {
        if (clickedButton === taskId) {
            console.log('Second click on button', taskId); //TODO: navigate to game/task/info
        } else {
            setClickedButton(taskId);
        }
    };
    const handleHomeClick = () => {
        //TODO: navigate to home
    };

    useEffect(() => {
        return () => {
            if (tasks.every((task) => task.completed)) {
                setStarred(!starred);
            }
        };
    }, [tasks, clickedButton]);

    return (
        <div className='task-ladder-container'>
            <div className='task-ladder-title-container'>
                <Card
                    className='task-ladder-card'
                    style={{
                        background:
                            'linear-gradient(to right, #F48535, #F4A435)',
                        height: '10svh',
                        padding: '0',
                        margin: '0',
                    }}
                >
                    <CardHeader
                        style={{
                            padding: '4% 2% 0% 4%',
                            margin: '0',
                            position: 'relative',
                        }}
                    >
                        <CardTitle>{taskListTitle}</CardTitle>
                        <CardDescription>{taskListDescription}</CardDescription>
                        <div className='task-ladder-back'>
                            <RiHome6Line
                                size={30}
                                onClick={() => handleHomeClick()}
                            />
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <div className='task-ladder'>
                <div className='task-ladder-score'>
                    <p>{score}</p>{' '}
                    <AiOutlineTrophy size={30} style={{ color: '#f6c342' }} />
                </div>

                <div
                    className='task-ladder-finish'
                    style={{ backgroundColor: starred ? '#f6c342' : '#6c6c6c' }}
                >
                    <div className={`task-${'inf'}`}>
                        <SteppedLineTo
                            from={`task-${'inf'}`}
                            to={`task-${0}`}
                            borderColor={
                                tasks[0].completed ? '#191919' : '#d1d5db'
                            }
                            borderWidth={3}
                            delay={true}
                            zIndex={-1}
                            className='task-ladder-line'
                        />
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                className={`task-${'inf'}`}
                                variant='outline'
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    padding: '0',
                                    background: 'white',
                                }}
                            >
                                <div
                                    className={`container ${starred ? 'starred' : 'unstarred'}`}
                                >
                                    <span className='star'>
                                        <span className='star-icon'>
                                            <FaRegStar
                                                size={30}
                                                style={{
                                                    textAlign: 'center',
                                                    verticalAlign: 'middle',
                                                }}
                                            />
                                        </span>
                                    </span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
                {tasks.map((task, index) => (
                    <div key={task.id} className={`task-${index}`}>
                        {index > 0 && (
                            <SteppedLineTo
                                from={`task-${index}`}
                                to={`task-${index + 1}`}
                                borderColor={
                                    tasks[index - 1].completed
                                        ? '#191919'
                                        : '#d1d5db'
                                }
                                borderWidth={3}
                                delay={true}
                                zIndex={-1}
                                className='task-ladder-line'
                            />
                        )}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative',
                                justifyContent: 'center',
                            }}
                        >
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className={`task-${index + 1}`}
                                        variant='outline'
                                        ref={buttonRef}
                                        style={{
                                            backgroundColor:
                                                clickedButton === task.id &&
                                                !task.completed
                                                    ? '#abecc7'
                                                    : task.completed
                                                      ? '#90e16f'
                                                      : '',
                                            width: '40px',
                                            height: '40px',
                                            padding: '0',
                                        }}
                                        onClick={() =>
                                            handleButtonClick(task.id)
                                        }
                                    >
                                        {getIcon(task.option, task)}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className='task-ladder-button'
                                    side={index % 2 === 0 ? 'left' : 'right'}
                                    align='center'
                                    style={{ maxWidth: '120px' }}
                                >
                                    {task.message}
                                </PopoverContent>
                            </Popover>
                            <div
                                className='task-ladder-regular-desc'
                                style={{
                                    [index % 2 === 0 ? 'right' : 'left']:
                                        '-110px',
                                }}
                            >
                                {task.shortText}
                            </div>
                        </div>
                    </div>
                ))}
                <SteppedLineTo
                    from={`task-${tasks.length}`}
                    borderColor={'#191919'}
                    borderWidth={3}
                    delay={true}
                    zIndex={-1}
                    to='task-ladder-container'
                    toAnchor='bottom center'
                />
            </div>
        </div>
    );
};

export default TaskLadder;
