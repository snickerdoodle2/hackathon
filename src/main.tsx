import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Wordle } from './components/minigames/wordle/wordle';
import Info from './pages/info';
import Task from './pages/task';

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
