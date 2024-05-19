import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Background from '@/components/ui/Background';
import SectionInfo from '@/components/ui/SectionInfo';
import { useNavigate } from 'react-router-dom';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Availability from '@/lib/availability';

const Home = () => {
    const [animationClass, setAnimationClass] = useState('animate-pulse');
    const [sectionId, setSectionId] = useState(0);
    const navigate = useNavigate();

    const isAvailable = (id: number) => {
        if (id === 0) {
            return true;
        }
        return Availability.isSectionAvailable(id);
    };

    const goToSection = (id: number) => {
        if (!(sectionId == 0)) {
            const fallbackRoute = `sections/${id}/tasks/`;
            navigate(fallbackRoute);
        }
    };

    const handleClickLeft = () => {
        setAnimationClass('animate-spin2');
        setSectionId((sectionId - 1) % 4);
        setTimeout(() => {
            setAnimationClass('animate-pulse');
        }, 1000);
    };

    const handleClickRight = () => {
        setAnimationClass('animate-spin2');
        setSectionId((sectionId + 1) % 4);
        setTimeout(() => {
            setAnimationClass('animate-pulse');
        }, 1000);
    };

    return (
        <Background animationClass={animationClass}>
            <Card className='animated-background text-white bg-gradient-to-br from-orange-300 to-orange-600 to-90% shadow-[#1f1f1f] shadow-xl border-none h-[145px]'>
                <img
                    src='assets/astro.png'
                    className='absolute top-[27px] right-0'
                ></img>
                <CardHeader>
                    <CardTitle className='absolute top-[60px] drop-shadow-[0_0px_8px_rgba(0,0,0,1)]'>
                        Ukończone wyzwania:
                    </CardTitle>
                </CardHeader>
                <CardContent className='drop-shadow-[0_0px_5px_rgba(0,0,0,1)]'>
                    {isAvailable(1) && <p>Quiz - KN Bit</p>}
                    {isAvailable(2) && <p>Wordle - Informatyka</p>}
                    {isAvailable(3) && <p>Nonogram - Space Systems</p>}
                </CardContent>
            </Card>

            <SectionInfo currentSectionId={sectionId} />

            <div className='p-8 flex justify-between absolute w-screen left-1/2 -translate-x-1/2 bottom-10 z-10 '>
                <Button
                    onClick={handleClickLeft}
                    variant='outline'
                    size='icon'
                    className='animate-bounce'
                >
                    <ChevronLeft className='h-4 w-4' />
                </Button>

                <Button
                    onClick={handleClickRight}
                    variant='outline'
                    size='icon'
                    className='animate-bounce'
                >
                    <ChevronRight className='h-4 w-4' />
                </Button>
            </div>

            <img
                src='assets/bottom.png'
                className='absolute bottom-0 left-0 drop-shadow-[0_0px_20px_rgba(0,0,0,1)]'
            ></img>

            {isAvailable(sectionId) ? (
                <img
                    src='assets/rocket.png'
                    className='absolute bottom-12 right-8 drop-shadow-[0_0px_20px_rgba(0,0,0,1)]'
                    onClick={() => {
                        goToSection(sectionId);
                    }}
                />
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger>
                        <img
                            src='assets/rocket2.png'
                            className='absolute bottom-12 right-8 drop-shadow-[0_0px_20px_rgba(0,0,0,1)]'
                        />
                    </AlertDialogTrigger>
                    <AlertDialogContent className='absolute overflow-clip'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Wpisz lub zeskanuj kod
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Kody do zadania znajdziesz na dniach otwartych
                                AGH a podpowiedzi co do ich lokacji umieszczone
                                są na poszczególnych sekcjach.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Anuluj</AlertDialogCancel>
                            <AlertDialogAction>Zeskanuj kod</AlertDialogAction>
                            <AlertDialogAction className='my-3'>
                                Wpisz kod ręcznie
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </Background>
    );
};

export default Home;
