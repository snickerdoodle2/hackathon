import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home.tsx';
import TaskLadder from './pages/taskList';
import { StorageProvider } from './components/Storage/storageContext';

import GamePage from '@/pages/game_page.tsx';
import Info from './pages/info';
import Task from './pages/task';
import Prizes from '@/pages/prizes';
import Scoreboard from './pages/scoreboard';
import Welcome from './pages/Welcome';

import Nono from './components/minigames/Nono';

import AuthorizeSection from '@/pages/authorize_section.tsx';

// TODO: jakies inne routy moze?
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'nono',
        element: <Nono onFinish={() => alert('xd')} />,
    },
    {
        path: 'taskList', //sections/:sectionId/
        element: <TaskLadder />,
    },
    {
        path: 'sections/:sectionId/tasks/',
        element: <TaskLadder />,
    },
    {
        path: 'sections/:sectionId/tasks/:taskId/game',
        element: <GamePage />,
    },
    {
        path: 'sections/:sectionId/authorize/:pass',
        element: <AuthorizeSection />,
    },
    {
        path: 'sections/1/tasks/2/game',
        element: <Info />,
    },
    {
        path: '/task',
        element: <Task />,
    },
    {
        path: '/prizes',
        element: <Prizes />,
    },
    {
        path: '/scoreboard',
        element: <Scoreboard />,
    },
    {
        path: '*',
        // TODO: jak bedzie czas to spoko to bedzie zrobic, ale pewnie nie bedzie
        // i to tak whatever
        // NOTE: chyba to musi być na dole (nie mam pojęcia)
        element: <p>404 - not found :(</p>,
    },
    {
        path: '/welcome',
        element: <Welcome />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StorageProvider>
            <RouterProvider router={router} />
        </StorageProvider>
    </React.StrictMode>
);
