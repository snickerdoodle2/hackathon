import GamePageLoading from '@/components/GamePage/GamePageLoading';
import Section from '@/lib/section';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Przykładowe dane JSON
// const jsonData = {
//     title: 'Wykład prof Gajęckiego',
//     description:
//         'W sali 1.41 prof Gajęcki będzie prowadził wykład - w trakcie niego poda wam kod do wpisania, który pozwoli wam zdobyć dodatkowe punkty',
//     correctCode: '1234',
// };

const Task: React.FC = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');

    const { sectionId, taskId } = useParams();

    const [section, setSection] = useState<Section | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const sectionInstance = await Section.createInstance(
                    parseInt(sectionId!)
                );
                setSection(sectionInstance);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, [sectionId]);

    if (loading) {
        return <GamePageLoading />;
    }

    if (error) {
        return <div>Error loading configuration: {error.message}</div>;
    }

    if (!section || !taskId) {
        return <div>Configuration not found</div>;
    }

    const task = section.getTaskById(parseInt(taskId!));

    if (!task || task.type != 'Task') {
        return <p>Task not found?</p>;
    }

    const jsonData = task.configuration;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSubmit = () => {
        if (code === jsonData.correctCode) {
            toast.success('Kod jest poprawny!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => navigate(-1), 2500); // Przekierowanie po 2.5 sekundy
        } else {
            toast.error('Kod jest niepoprawny. Spróbuj ponownie.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className='relative px-8 py-8 max-w-screen-lg mx-auto'>
            <ToastContainer />
            <button
                className='absolute top-4 left-8 bg-none border-none text-2xl font-bold'
                onClick={handleBackClick}
            >
                ←
            </button>
            <div className='mt-12'>
                <h1 className='text-2xl font-bold mb-4'>{jsonData.title}</h1>
                <p className='mb-8'>{jsonData.description}</p>
                <input
                    type='text'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className='block w-full px-4 py-2 mb-8 border border-gray-300 rounded'
                    placeholder='Wprowadź kod'
                />
                <button
                    className='fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer'
                    onClick={handleSubmit}
                >
                    Zatwierdź
                </button>
            </div>
        </div>
    );
};

export default Task;
