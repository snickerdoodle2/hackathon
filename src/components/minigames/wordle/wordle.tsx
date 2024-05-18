import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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

const Cell: React.FC<{ text: string; className?: string }> = ({
    text,
    className = 5,
}) => {
    return (
        <p
            className={cn(
                'border aspect-square text-center justify-center items-center flex rounded-lg',
                className
            )}
        >
            {text}
        </p>
    );
};

const Results: React.FC<{ choices: Language[]; correct: Language }> = ({
    choices,
}) => {
    return (
        <div className='grid grid-cols-5 text-[0.7rem] font-semibold break-words gap-1'>
            <Cell text='Język' className='font-bold' />
            <Cell text='Paradygmat' className='font-bold' />
            <Cell text='Typowany' className='font-bold' />
            <Cell text='Compiled?' className='font-bold' />
            <Cell text='Rok wydania' className='font-bold' />
            {choices.map((lang) => {
                return (
                    <>
                        <Cell text={lang.name} />
                        <Cell text={lang.paradigm.join(', ')} />
                        <Cell text={lang.typed} />
                        <Cell text={lang.complied} />
                        <Cell text={'' + lang.year} />
                    </>
                );
            })}
        </div>
    );
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
        <div className='flex flex-col justify-between h-svh'>
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
                            <p
                                key={e.name}
                                onClick={() => selectLanguage(e.name)}
                            >
                                {e.name}
                            </p>
                        ))}
            </div>

            <Results choices={choices} correct={langs[0]} />
        </div>
    );
};
