//generat ebasic page to disiplay components
//TODO: import Games from '../components/game';
import { useNavigate, useParams } from 'react-router-dom';
import Section from '../lib/section';
import { useState, useEffect } from 'react';
import GameWrapper from '@/components/GamePage/GameWrapper';
import GamePageLoading from '@/components/GamePage/GamePageLoading';

export default function GamePage() {
    const navigate = useNavigate();
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

    if (!task || task.type != 'Game') {
        return <p>Task not found?</p>;
    }

    const fallbackRoute = `/sections/${sectionId}/tasks`;

    return (
        <GameWrapper
            navigate={navigate}
            fallbackRoute={fallbackRoute}
            task={task}
        />
    );
}
