import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TaskLadder from './pages/taskList';

import Nono from './components/minigames/Nono';

import { GamePage } from '@/pages/game_page.tsx';
import { Wordle } from './components/minigames/wordle/wordle';
import Info from './pages/info';
import Task from './pages/task';
import MiniQuiz from './pages/miniquiz';

// TODO: jakies inne routy moze?
const router = createBrowserRouter([
    {
        path: '/',
        element: <p>Home</p>,
    },
    {
        path: 'scoreboard',
        element: <p>Scoreboard</p>,
    },
    {
        path: 'taskList', //sections/:sectionId/
        element: <TaskLadder />,
    },
    {
        path: 'nono',
        element: <Nono onFinish={() => alert('xd')} />,
    },
    {
        path: 'sections/:sectionId/tasks/',
        element: <div>tasklist</div>,
    },
    {
        path: 'sections/:sectionId/tasks/:taskId/game',
        element: <GamePage />,
    },
    {
        path: 'debug/wordle',
        element: <Wordle />,
    },
    {
        path: '/info',
        element: <Info />,
    },
    {
        path: '/task',
        element: <Task />,
    },
    {
        path: '/mini-quiz',
        element: <MiniQuiz />,
    },
    {
        path: '*',
        // TODO: jak bedzie czas to spoko to bedzie zrobic, ale pewnie nie bedzie
        // i to tak whatever
        // NOTE: chyba to musi być na dole (nie mam pojęcia)
        element: <p>404 - not found :(</p>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
