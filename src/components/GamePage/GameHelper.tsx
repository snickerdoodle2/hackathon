import Nono from '../minigames/Nono';
import MiniQuiz from '../minigames/miniquiz';
import { Wordle } from '../minigames/wordle/wordle';

interface Props {
    type: string;
    onFinish: (_arg: number) => void;
}

export default function GameHelper({ type, onFinish }: Props) {
    console.log(type);
    if (type === 'Nonogram') return <Nono onFinish={onFinish} />;
    if (type === 'Wordle') return <Wordle onFinish={onFinish} />;
    if (type === 'Miniquiz') return <MiniQuiz onFinish={onFinish} />;
    return <p>Game not found :(</p>;
}
