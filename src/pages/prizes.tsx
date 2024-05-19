import Background from '@/components/ui/Background';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';

type Prize = {
    id: number;
    name: string;
    price: number;
};

const Row: React.FC<{ prize: Prize; onClick: () => void }> = ({
    prize,
    onClick,
}) => {
    return (
        <li className='grid grid-cols-[7fr_1fr_2fr] border-b last:border-0 justify-center items-center gap-4 pb-3'>
            <p className=''>{prize.name}</p>
            <p className='text-right font-semibold'>{prize.price}</p>
            <Button variant='outline' size='sm' onClick={onClick}>
                Wybierz
            </Button>
        </li>
    );
};

const Prizes = () => {
    const selectItem = (id: number) => {
        return () => {
            // TODO: use toast :)) && subtract points
            console.log(`Selected item no ${id}`);
        };
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [prizes, setPrizes] = useState<Prize[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('/prizes.json');
            if (!res.ok) {
                setError(true);
                return;
            }

            const tmp = (await res.json()) as Prize[];
            tmp.sort((a, b) => b.price - a.price);
            setPrizes(tmp);
            setLoading(false);
        })();
    }, []);

    if (error) {
        return <p>Error :(</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Background animationClass='animate-pulse'>
            <Card className='w-full h-full bg-background/90'>
                <CardHeader>
                    <CardTitle>Nagrody</CardTitle>
                    <CardDescription>
                        Wymień zdobyte przez siebie punkty na super nagrody!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className='flex flex-col gap-4'>
                        {prizes.map((p) => (
                            <Row
                                key={p.id}
                                prize={p}
                                onClick={selectItem(p.id)}
                            />
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </Background>
    );
};

export default Prizes;
