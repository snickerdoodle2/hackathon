// TODO: naprawic ten paski po prawej
import { useEffect, useState } from 'react';
import Cell from '../nonogram/Cell';
import Webcam from 'react-webcam';
// import { useNavigate } from 'react-router-dom';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// import WinPopup from '../nonogram/WinPopup';

interface Props {
    onFinish: (_num: number) => void;
}

export default function Nono({ onFinish }: Props) {
    // skyblue, star, grey, orange, yellow, red, white, window
    const c = [
        '18256b',
        'fff566',
        '363132',
        'ffc20e',
        'fff200',
        'ba0f31',
        'e0bfc5',
        '70c6db',
    ];
    const cNonogram: number[][] = [
        [0, 0, 0, 5, 0, 0, 1],
        [1, 0, 5, 6, 5, 0, 0],
        [0, 0, 6, 7, 6, 0, 0],
        [0, 0, 5, 6, 5, 0, 0],
        [0, 0, 6, 5, 6, 0, 1],
        [0, 0, 5, 2, 5, 0, 0],
        [0, 2, 2, 3, 2, 2, 0],
        [0, 2, 3, 4, 3, 2, 0],
    ];
    const nonogram: string[] = [
        '0001000',
        '0011100',
        '0011100',
        '0010100',
        '0011100',
        '0011100',
        '0110110',
        '0100010',
    ];
    const cluesR = getRowClues();
    const cluesC = getColumnClues();

    const celldimension = 30;
    const nono_width = nonogram[0].length * celldimension;
    const nono_height = nonogram.length * celldimension;
    const top_num_height = 100;
    const left_num_width = 100;

    const [wrong, setWrong] = useState<number>(countOnes());

    // const [showComponent, setShowComponent] = useState(false);

    // const [count, setCount] = useState<number>(1);

    // const navi = useNavigate();

    function countOnes() {
        let ones = 0;
        nonogram.forEach(
            (row: string) =>
                (ones += row.split('').filter((char) => char === '1').length)
        );
        return ones;
    }

    function changeWrong(change: number) {
        setWrong((wrong) => wrong + change);
    }

    function getRowClues() {
        const rowClues: number[][] = [];
        nonogram.forEach((item) => {
            const rc = [];
            let temp = 0;
            let continous = false;
            item.split('').forEach((letter) => {
                if (letter == '0' && continous) {
                    rc.push(temp);
                    continous = false;
                    temp = 0;
                }
                if (letter == '1') {
                    temp += 1;
                    if (!continous) {
                        continous = true;
                    }
                }
            });
            if (continous) {
                rc.push(temp);
            }
            if (rc.length == 0) {
                rc.push(0);
            }
            rowClues.push(rc);
        });
        return rowClues;
    }

    function getColumnClues() {
        const columnClues: number[][] = [];

        for (let i = 0; i < nonogram[0].length; i++) {
            const cc = [];
            let temp = 0;
            let continous = false;
            nonogram.forEach((item) => {
                if (item[i] == '0' && continous) {
                    cc.push(temp);
                    continous = false;
                    temp = 0;
                }
                if (item[i] == '1') {
                    temp += 1;
                    if (!continous) {
                        continous = true;
                    }
                }
            });
            if (continous) {
                cc.push(temp);
            }
            if (cc.length == 0) {
                cc.push(0);
            }
            columnClues.push(cc);
        }
        return columnClues;
    }

    const whenCountdown = 0;
    const backTransTarget = 1.5;
    const [backgroundTransition, setBackgroundTransition] = useState<number>(0);

    // function countdown(num: number) {
    //     setCount(num);
    //     if (num == 0) {
    //         setTimeout(() => navi('/'), 1000);
    //     }
    //     setTimeout(() => countdown(num - 1), 1000);
    // }

    useEffect(() => {
        if (wrong == whenCountdown) {
            // countdown(countdownLength);
            setBackgroundTransition(backTransTarget);
            onFinish(500);
        }
    }, [wrong]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                borderWidth: 1,
                flex: 1,
                width: nono_width + left_num_width,
                maxHeight: nono_height + top_num_height,
            }}
        >
            

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: top_num_height,
                }}
            >
                <div style={{ width: left_num_width }} />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: nono_width,
                    }}
                >
                    {cluesC.map((row) => (
                        <div
                            style={{
                                width: celldimension,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                borderLeftWidth: 1,
                            }}
                        >
                            {row.map((num) => (
                                <div style={{ textAlign: 'center' }}>{num}</div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: nono_height,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: left_num_width,
                    }}
                >
                    {cluesR.map((row) => (
                        <div
                            style={{
                                height: celldimension,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                borderTopWidth: 1,
                            }}
                        >
                            {row.map((num) => (
                                <div style={{ textAlign: 'center' }}>{num}</div>
                            ))}
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        width: nono_width,
                        borderTopWidth: 0.5,
                        borderLeftWidth: 0.5,
                    }}
                >
                    {nonogram.map((row, i) => (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: nono_width,
                            }}
                        >
                            {row.split('').map((cell, j) => (
                                <div
                                    style={{
                                        display: 'flex',
                                        width: celldimension,
                                        height: celldimension,
                                    }}
                                >
                                    <Cell
                                        dimension={celldimension}
                                        shouldBeClicked={
                                            cell == '1' ? true : false
                                        }
                                        changeWrong={changeWrong}
                                        allSolved={
                                            backgroundTransition ==
                                            backTransTarget
                                        }
                                        solvedColor={`#${c[cNonogram[i][j]]}`}
                                        backTrans={backgroundTransition}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
