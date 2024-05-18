import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Background from '@/components/ui/Background';

const Home = () => {
    return (
        <Background>
            <CardTitle className='py-4 px-6 drop-shadow-2xl text-slate-50 text-center'>
                Strona Główna
            </CardTitle>

            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
            <div className='p-8 flex justify-between absolute w-screen left-1/2 -translate-x-1/2 bottom-10 z-10'>
                <Button variant='outline' size='icon'>
                    <ChevronLeft className='h-4 w-4' />
                </Button>

                <Button variant='outline' size='icon'>
                    <ChevronRight className='h-4 w-4' />
                </Button>
            </div>
            <img src='assets/bottom.png' className='absolute bottom-0 '></img>
            <img
                src='assets/rocket.png'
                className='absolute bottom-12 right-8'
            ></img>
        </Background>
    );
};

export default Home;
