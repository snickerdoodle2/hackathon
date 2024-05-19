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
import { useNavigate, useParams } from 'react-router-dom';
import Section, { Task } from '@/lib/section';

enum Option {
    Task = 'task',
    Info = 'info',
    Game = 'game',
}
interface LocalTask {
    id: number;
    name: string;
    message: string;
    completed: boolean;
    shortText: string;
    option: Option;
}

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

const TaskLadder: React.FC = () => {
    const [clickedButton, setClickedButton] = useState<number | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [starred, setStarred] = useState(false);
    const { sectionId } = useParams();
    const [section, setSection] = useState<Section | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();
    const [taskListDescription, setTaskListDescription] = useState<
        string | undefined
    >(undefined);
    const [sectionName, setSectionName] = useState<string | undefined>(
        undefined
    );
    const [tasks, setTasks] = useState<LocalTask[]>([]);
    const storedScore = localStorage.getItem('score');
    const score = storedScore ? parseInt(storedScore) : 0;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                if (sectionId != undefined) {
                    const sectionInstance = await Section.createInstance(
                        parseInt(sectionId)
                    );
                    setSection(sectionInstance);
                }
            } catch (err) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, [sectionId]);

    // this use effect sets all data reqired for task ladder
    useEffect(() => {
        if (!loading && section != undefined) {
            const ttasks: LocalTask[] = [];
            setTaskListDescription(section.getConfigData().localization);
            setSectionName(section.getConfigData().name);
            section.getConfigData().tasks.forEach((task: Task) => {
                const newTask: LocalTask = {
                    id: task.id,
                    message: task.overview,
                    completed: false,
                    shortText: task.title,
                    option:
                        task.type === 'Game'
                            ? Option.Game
                            : task.type === 'Task'
                                ? Option.Task
                                : task.type === 'Info'
                                    ? Option.Info
                                    : (() => {
                                        throw new Error(`Unknown task ${task.type}`);
                                    })(),
                    name: 'unknownRR',
                };
                ttasks.push(newTask);
            });
            setTasks(ttasks);
        }
    }, [section, loading]);
    const getIcon = (option: Option, task: LocalTask) => {
        if (!loading && section != undefined && option === Option.Task) {
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
        } else if (!loading && option === Option.Info) {
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
        } else if (!loading && task != undefined && option === Option.Game) {
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
            const fallbackRoute = `/sections/${sectionId}/tasks/${taskId}/game`;
            navigate(fallbackRoute);
        } else {
            setClickedButton(taskId);
        }
    };

    const handleHomeClick = () => {
        const fallbackRoute = `/`;
        navigate(fallbackRoute);
    };

    useEffect(() => {
        if (!loading && section != undefined) {
            return () => {
                if (tasks.every((task) => task.completed)) {
                    setStarred(!starred);
                }
            };
        }
    }, [clickedButton, starred]); //add tasks as dep

    const handleContainerClick = () => {
        if (clickedButton !== null) {
            setClickedButton(null);
        }
    };

    if (loading) {
        return Loading();
    }

    if (error) {
        return <div>Error loading configuration: {error.message}</div>;
    }

    if (!section) {
        return <div>Configuration not found</div>;
    }

    if (!loading) {
        return (
            !loading &&
            section != undefined &&
            tasks[0] != undefined && (
                <div
                    className='task-ladder-container'
                    onClick={() => handleContainerClick()}
                >
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
                                <CardTitle>{sectionName}</CardTitle>
                                <CardDescription style={{ color: 'white' }}>
                                    {taskListDescription}
                                </CardDescription>
                                <div className='task-ladder-back'>
                                    <RiHome6Line
                                        style={{ color: 'white' }}
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
                            <AiOutlineTrophy
                                size={30}
                                style={{ color: '#f6c342' }}
                            />
                        </div>

                        <div
                            className='task-ladder-finish'
                            style={{
                                backgroundColor: starred
                                    ? '#f6c342'
                                    : '#6c6c6c',
                            }}
                        >
                            <div className={`task-${'inf'}`}>
                                <SteppedLineTo
                                    from={`task-${'inf'}`}
                                    to={`task-${0}`}
                                    borderColor={
                                        tasks != undefined && tasks[0].completed
                                            ? '#191919'
                                            : '#d1d5db'
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
                                                            verticalAlign:
                                                                'middle',
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
                                                        clickedButton ===
                                                            task.id &&
                                                            !task.completed
                                                            ? '#abecc7'
                                                            : task.completed
                                                                ? '#90e16f'
                                                                : '',
                                                    width: '40px',
                                                    height: '40px',
                                                    padding: '0',
                                                }}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleButtonClick(task.id);
                                                }}
                                            >
                                                {getIcon(task.option, task)}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className='task-ladder-button'
                                            side={
                                                index % 2 === 0
                                                    ? 'left'
                                                    : 'right'
                                            }
                                            align='center'
                                            style={{ maxWidth: '120px' }}
                                        >
                                            {task.message}
                                        </PopoverContent>
                                    </Popover>
                                    <div
                                        className='task-ladder-regular-desc'
                                        style={{
                                            [index % 2 === 0
                                                ? 'right'
                                                : 'left']: '-110px',
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
            )
        );
    }
};

export default TaskLadder;
