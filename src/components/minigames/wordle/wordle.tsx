import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
        name: 'C++',
        paradigm: ['Imperative', 'Objective'],
        year: 1983,
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

const Cell: React.FC<{ children?: React.ReactNode; className?: string }> = ({
    children,
    className = 5,
}) => {
    return (
        <p
            className={cn(
                'border aspect-square text-center justify-center items-center flex rounded-lg',
                className
            )}
        >
            {children}
        </p>
    );
};

type Match = 'FULL' | 'PARTIAL' | 'NO';

const getBGColor = (match: Match) => {
    switch (match) {
        case 'FULL':
            return 'bg-green-500';
        case 'PARTIAL':
            return 'bg-yellow-300';
        case 'NO':
            return 'bg-red-500';
    }
};

const getArrow = (diff: number) => {
    if (diff === 0) return <></>;
    if (diff < 0) return <ArrowUp className='w-5 h-5' />;
    return <ArrowDown className='w-14 h-14 opacity-15 absolute' />;
};

const getCommon = <T,>(a: T[], b: T[]) => {
    const common = a.filter((e) => b.includes(e));

    return a.length === common.length && common.length === b.length
        ? 'FULL'
        : common.length > 0
          ? 'PARTIAL'
          : 'NO';
};

const Results: React.FC<{ choices: Language[]; correct: Language }> = ({
    choices,
    correct,
}) => {
    return (
        <div className='grid grid-cols-5 text-[0.6rem] font-semibold break-words gap-1 '>
            <Cell className='font-bold'>
                <span>Język</span>
            </Cell>
            <Cell className='font-bold'>
                <span>Paradygmat</span>
            </Cell>
            <Cell className='font-bold'>
                <span>Typowany</span>
            </Cell>
            <Cell className='font-bold'>
                <span>Compiled?</span>
            </Cell>
            <Cell className='font-bold'>
                <span>Rok wydania</span>
            </Cell>
            {choices.map((lang) => {
                const yearDiff = lang.year - correct.year;
                return (
                    <React.Fragment key={lang.name}>
                        <Cell>
                            <span>{lang.name}</span>
                        </Cell>
                        <Cell
                            className={getBGColor(
                                getCommon(lang.paradigm, correct.paradigm)
                            )}
                        >
                            <span>{lang.paradigm.join(', ')}</span>
                        </Cell>
                        <Cell
                            className={getBGColor(
                                lang.typed === correct.typed ? 'FULL' : 'NO'
                            )}
                        >
                            <span>{lang.typed}</span>
                        </Cell>
                        <Cell
                            className={getBGColor(
                                lang.complied === correct.complied
                                    ? 'FULL'
                                    : 'NO'
                            )}
                        >
                            <span>{lang.complied}</span>
                        </Cell>
                        <Cell
                            className={getBGColor(
                                yearDiff == 0
                                    ? 'FULL'
                                    : Math.abs(yearDiff) < 10
                                      ? 'PARTIAL'
                                      : 'NO'
                            )}
                        >
                            {getArrow(yearDiff)}
                            <span>{lang.year}</span>
                        </Cell>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export const Wordle: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const [input, setInput] = useState('');

    const correct = langs[0];

    const [choices, setChoices] = useState<Language[]>([]);

    const selectLanguage = (name: string) => {
        setInput('');
        const lang = langs.find((e) => e.name === name);
        if (!lang) return;
        setChoices((prev) => [...prev, lang]);
    };

    const correctChoice = choices.includes(correct);

    useEffect(() => {
        if (correctChoice) {
            onFinish();
        }
    }, [correctChoice, onFinish]);

    if (correctChoice) {
        return (
            <div>
                <p>yay!</p>
                <p>Redirecting in 5 seconds!!</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col justify-between flex-1 px-4 py-2 '>
            <div>
                <Input
                    value={input}
                    placeholder='Wpisz język programowania...'
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    className='mb-6'
                />
                <ul className='flex flex-col gap-2'>
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
                                <li
                                    key={e.name}
                                    onClick={() => selectLanguage(e.name)}
                                >
                                    <Card className='bg-background py-2 px-4'>
                                        {e.name}
                                    </Card>
                                </li>
                            ))}
                </ul>
            </div>

            <Results choices={choices} correct={correct} />
        </div>
    );
};
