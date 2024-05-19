import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    StorageContext,
    StorageContextType,
} from '@/components/Storage/storageContext';
import Background from '@/components/ui/Background';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const Info: React.FC = () => {
    const navigate = useNavigate();

    // Przykładowy JSON
    const jsonData = {
        infos: {
            'Czym jest BIT':
                'Koło naukowe BIT to przede wszystkim miejsce, gdzie studenci AGH mogą rozwijać swoje zainteresowania i się nimi dzielić. Znajdziemy tutaj ludzi zainteresowanych nowoczesnymi metodami tworzenia oprogramowania, aktualnymi technologiami webowymi, a także algorytmami czy sztuczną inteligencją.',
            'Komu pomagamy':
                'Oprócz rozwijania swoich pasji, dzielimy się też wiedzą z zakresu studiów, prowadząc zajęcia wprowadzające w dziedziny matematyki i informatyki dla osób, które wcześniej nie miały z danymi zagadnieniami styczności. Wszystko po to, żeby wymienić się doświadczeniem i szybciej oraz lepiej przygotować się na zajęcia na uczelni.',
        },
        youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        links: {
            'Więcej o KN BIT': 'https://knbit.edu.pl',
            Linkedin:
                'https://www.linkedin.com/company/bit-scientific-group-at-agh-university/?originalSubdomain=pl',
        },
    };

    // Przekształć dane JSON na tablicę sekcji
    const sections = Object.entries(jsonData.infos);

    // Tworzenie sekcji na podstawie danych JSON
    const renderSections = () => {
        return sections.map(([title, content], index) => (
            <div key={index} className='mt-4'>
                <h2 className='text-lg font-bold'>{title}</h2>
                <p className='text-base'>{content}</p>
            </div>
        ));
    };

    // Sprawdź, czy jest link do YouTube i wyrenderuj iframe
    const renderYouTube = () => {
        if (jsonData.youtube) {
            return (
                <div className='mt-8'>
                    <iframe
                        src={jsonData.youtube}
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        className='w-full max-w-screen-md mx-auto'
                        style={{ height: 'auto', aspectRatio: '16/9' }}
                    ></iframe>
                </div>
            );
        }
        return null;
    };

    // Sprawdź, czy są jakieś linki i wyrenderuj sekcję linków
    const renderLinks = () => {
        if (Object.keys(jsonData.links).length > 0) {
            return (
                <div className='mt-8'>
                    <h2 className='text-lg font-bold'>Linki</h2>
                    <ul className='list-none'>
                        {Object.entries(jsonData.links).map(
                            ([text, url], index) => (
                                <li key={index}>
                                    <a
                                        href={url}
                                        className='text-blue-500 hover:underline'
                                    >
                                        {text}
                                    </a>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            );
        }
        return null;
    };

    const context = useContext(StorageContext);

    if (context === undefined) {
        throw new Error('useStorage must be used within a StorageProvider');
    }

    const { points, setPoints }: StorageContextType = context;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleReadClick = () => {
        setPoints(points + 100);
        navigate(-1);
    };

    return (
        <Background animationClass={'animate-pulse'}>
            <Card className='overflow-y-scroll bg-background/90'>
                <CardHeader className='flex flex-row items-center'>
                    <Button
                        className='mt-[6px]'
                        variant='ghost'
                        size='icon'
                        onClick={handleBackClick}
                    >
                        <ArrowLeft />
                    </Button>
                    <CardTitle>Informacje</CardTitle>
                </CardHeader>
                <CardContent className='text-justify'>
                    {/* Renderowanie sekcji */}
                    {renderSections()}

                    {/* Renderowanie filmu z YouTube, jeśli istnieje */}
                    {renderYouTube()}

                    {/* Renderowanie sekcji linków */}
                    {renderLinks()}
                </CardContent>
                <CardFooter>
                    <Button className='mr-0 ml-auto' onClick={handleReadClick}>
                        Przeczytałem
                    </Button>
                </CardFooter>
            </Card>
        </Background>
    );
};

export default Info;
