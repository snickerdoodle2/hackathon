import { useEffect, useState } from 'react';

interface Props {
    shouldBeClicked: boolean;
    dimension: number;
    changeWrong: (_arg: number) => void;
    solvedColor: string;
    allSolved: boolean;
    backTrans: number;
}

enum State {
    EMPTY = 0,
    FULL = 1,
    X = 2,
}

export default function Cell({
    shouldBeClicked,
    changeWrong,
    dimension,
    solvedColor,
    allSolved,
    backTrans,
}: Props) {
    const [colour, setColour] = useState<string>('white');
    const [xVisible, setXVisible] = useState<boolean>(false);
    const [currentState, setState] = useState<State>(State.EMPTY);
    const [paddingWidth, setPaddingWidth] = useState(0.5);

    function changeState(state: State) {
        if (state == State.EMPTY) {
            setColour('white');
            setXVisible(false);
        } else if (state == State.FULL) {
            changeWrong(shouldBeClicked == true ? -1 : 1);
            setColour('black');
            setXVisible(false);
        } else {
            changeWrong(shouldBeClicked == false ? -1 : 1);
            setColour('white');
            setXVisible(true);
        }
        setState(state);
    }

    useEffect(() => {
        if (allSolved) {
            setXVisible(false);
            setColour(solvedColor);
            setPaddingWidth(0);
        }
    }, [allSolved, solvedColor]);

    return (
        <button
            style={{
                width: dimension,
                height: dimension,
                backgroundColor: 'black',
                padding: paddingWidth,
            }}
            onClick={() => {
                changeState((currentState + 1) % 3);
            }}
        >
            <div
                style={{
                    backgroundColor: colour,
                    width: '100%',
                    height: '100%',
                    transition: `background-color ${backTrans}s ease-out`,
                }}
            >
                {xVisible ? 'X' : null}
            </div>
        </button>
    );
}
