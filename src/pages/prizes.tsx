import Background from "@/components/ui/Background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Prize = {
    id: number
    name: string;
    price: number
}

const items: Prize[] = [
    {
        id: 1,
        name: "Pad XBOX",
        price: 900
    },
    {
        id: 2,
        name: "Pad XBOX",
        price: 900
    },
    {
        id: 3,
        name: "Pad XBOX",
        price: 900
    },
    {
        id: 4,
        name: "Pad XBOX",
        price: 900
    },
]

const Row: React.FC<{ prize: Prize, onClick: () => void }> = ({ prize, onClick }) => {
    return <li className="grid grid-cols-[7fr_1fr_2fr] border-b last:border-0 justify-center items-center gap-4 pb-3">
        <p className="">{prize.name}</p>
        <p className="text-right font-semibold">{prize.price}</p>
        <Button variant='outline' size='sm' onClick={onClick}>Wybierz</Button>
    </li>
}

const Prizes = () => {
    const selectItem = (id: number) => {
        return () => {
            // TODO: use toast :)) && subtract points
            console.log(`Selected item no ${id}`)
        }
    }

    return <Background>
        <Card className="w-full h-full ">
            <CardHeader>
                <CardTitle>Nagrody</CardTitle>
                <CardDescription>Wymień zdobyte przez siebie punkty na super nagrody!</CardDescription>
            </CardHeader>
            <CardContent >
                <ul className="flex flex-col gap-4">
                    {items.map(p => <Row key={p.id} prize={p} onClick={selectItem(p.id)} />)}
                </ul>
            </CardContent>
        </Card>
    </Background>
}

export default Prizes;
