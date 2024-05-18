import { Input } from '@/components/ui/input';
import { useState } from 'react';

type Paradigm = 'Objective' | 'Imperative' | 'Functional';
type Language = {
    name: string;
    paradigm: Paradigm[];
    year: number;
    complied: 'Compiled' | 'Interpreted';
    typed: 'Static' | 'Dynamic';
};

const langs: Language[] = [
    {
        name: 'C',
        paradigm: ['Imperative'],
        year: 1972,
        complied: 'Compiled',
        typed: 'Static',
    },
    {
        name: 'Python',
        paradigm: ['Imperative', 'Objective'],
        year: 1991,
        complied: 'Interpreted',
        typed: 'Dynamic',
    },
];

export const Wordle = () => {
    const [input, setInput] = useState('');

    return (
        <div>
            <Input
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                }}
            />
            {input.length > 0 && langs.map(e => <p>{e.name}</p>)}
        </div>
    );
};
