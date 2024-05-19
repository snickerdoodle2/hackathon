import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    StorageContext,
    StorageContextType,
} from '@/components/Storage/storageContext';
import Background from '@/components/ui/Background';

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
            <div
                style={{
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    width: '90%',
                    height: '100%',
                    borderRadius: 20,
                    alignSelf: 'center',
                    fontWeight: 500,
                    padding: 20,
                    fontSize: 18,
                    alignItems: 'center',
                    textAlign: 'center',
                    alignContent: 'space-around',
                }}
                className='overflow-y-scroll'
            >
                <div className='info-window px-8 py-8 max-w-screen-lg mx-auto overflow-y-scroll'>
                    <button
                        className='back-button absolute top-4 left-8 bg-none border-none text-xl font-bold'
                        onClick={handleBackClick}
                    >
                        ←
                    </button>
                    <div className='content mt-12'>
                        <h1 className='text-2xl font-bold mb-8'>Informacje</h1>

                        {/* Renderowanie sekcji */}
                        {renderSections()}

                        {/* Renderowanie filmu z YouTube, jeśli istnieje */}
                        {renderYouTube()}

                        {/* Renderowanie sekcji linków */}
                        {renderLinks()}

                        <Button
                            className='read-button block mx-auto mt-8 px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer'
                            onClick={handleReadClick}
                        >
                            Przeczytałem
                        </Button>
                    </div>
                </div>
            </div>
        </Background>
    );
};

export default Info;
