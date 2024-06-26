import React, { createContext, useState, ReactNode, useEffect } from 'react';
import StorageService from './storageService';

// ADDING NEW VALUES:
// Interface:
// ---> add value and setValue
// StorageProvider:
// ---> :
// create new sevice instance with given key
// create new useState for wanted value
// create setFunction

// HOW TO USE:
// const { points, setPoints } = useStorage();

export interface StorageContextType {
    points: number;
    setPoints: (points: number) => void;
}

export const StorageContext = createContext<StorageContextType | undefined>(
    undefined
);

export const StorageProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const storageService = StorageService.getInstance('points');
    const [points, setPointsState] = useState<number>(() => {
        const storedPoints = storageService.getItem();
        return storedPoints ? parseInt(storedPoints) : 0;
    });

    const setPoints = (points: number) => {
        setPointsState(points);
        storageService.setItem(points.toString());
    };

    useEffect(() => {
        const storedPoints = storageService.getItem();
        if (storedPoints !== null) {
            setPointsState(parseInt(storedPoints));
        }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StorageContext.Provider value={{ points, setPoints }}>
            {children}
        </StorageContext.Provider>
    );
};
