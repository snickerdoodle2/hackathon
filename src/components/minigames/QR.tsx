import React, { useState } from 'react';
import Webcam from 'react-webcam';

export default function QR() {
    const [isShown, setShown] = useState<boolean>(false);

    return (
        <div>
            {isShown ? <Webcam /> : null}
            <button onClick={() => setShown(isShown ? false : true)}>
                kamera
            </button>
        </div>
    );
}
