import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Nono from './components/minigames/Nono';

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
        path: 'nono',
        element: <Nono onFinish={()=>alert("xd")}/>
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
