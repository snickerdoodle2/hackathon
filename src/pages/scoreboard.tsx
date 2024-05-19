import Background from '@/components/ui/Background';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type User = {
    name: string;
    score: number;
};

const mock: User[] = [
    {
        name: 'Janek',
        score: 210,
    },
    {
        name: 'Ania',
        score: 180,
    },
    {
        name: 'Ty',
        score: 220,
    },
    {
        name: 'Marysia',
        score: 190,
    },
    {
        name: 'Krzysiek',
        score: 200,
    },
    {
        name: 'Aga',
        score: 170,
    },
    {
        name: 'Tomek',
        score: 230,
    },
    {
        name: 'Kasia',
        score: 175,
    },
    {
        name: 'Michałek',
        score: 185,
    },
    {
        name: 'Ewka',
        score: 160,
    },
];

const Row: React.FC<{ user: User; index: number }> = ({ user, index }) => {
    return (
        <li className='grid grid-cols-[7fr_1fr] border-b last:border-0 justify-center items-center gap-4 pb-3'>
            <p className=''>
                <span className='font-bold'>{index + 1}.</span>{' '}
                <span className={user.name === 'Ty' ? 'font-bold' : ''}>
                    {user.name}
                </span>
            </p>
            <p className='text-right font-semibold'>{user.score}</p>
        </li>
    );
};

const Scoreboard = () => {
    return (
        <Background animationClass='animate-pulse'>
            <Card className='w-full h-full bg-background/90'>
                <CardHeader>
                    <CardTitle>Tablica wyników</CardTitle>
                    <CardDescription>
                        Porównaj swoje wyniki z innymi!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className='flex flex-col gap-4'>
                        {mock
                            .sort((a, b) => b.score - a.score)
                            .map((p, i) => (
                                <Row index={i} key={p.name} user={p} />
                            ))}
                    </ul>
                </CardContent>
            </Card>
        </Background>
    );
};

export default Scoreboard;
