import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

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

const Results: React.FC<{ choices: Language[] }> = ({ choices }) => {
    return <p>{choices.map((e) => e.name).join(' ')}</p>;
};

export const Wordle = () => {
    const [input, setInput] = useState('');

    const [choices, setChoices] = useState<Language[]>([]);

    const selectLanguage = (name: string) => {
        setInput('');
        const lang = langs.find((e) => e.name === name);
        if (!lang) return;
        setChoices((prev) => [...prev, lang]);
    };

    return (
        <div>
            <Input
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                }}
            />
            {input.length > 0 &&
                langs
                    .filter((e) => {
                        if (
                            !e.name
                                .toLowerCase()
                                .startsWith(input.toLowerCase())
                        )
                            return false;

                        // hide already selected
                        if (choices.find((c) => c.name === e.name))
                            return false;

                        return true;
                    })
                    .map((e) => (
                        <p key={e.name} onClick={() => selectLanguage(e.name)}>
                            {e.name}
                        </p>
                    ))}

            <Results choices={choices} correct={langs[0]} />
        </div>
    );
};
