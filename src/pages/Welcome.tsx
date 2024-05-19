import Background from '@/components/ui/Background';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navi = useNavigate();

    return (
        <Background>
            <div
                style={{
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    width: '90%',
                    height: '90%',
                    borderRadius: 20,
                    alignSelf: 'center',
                    fontWeight: 500,
                    padding: 20,
                    fontSize: 18,
                    alignItems: 'center',
                    textAlign: 'center',
                    alignContent: "space-around",
                }}
            >
                <div>
                    <p>
                        W roku 2050, ludzkość osiągnęła technologiczny punkt
                        zwrotny, który umożliwił kolonizację Marsa. Po
                        dziesięcioleciach intensywnych badań i przygotowań,
                        globalne narody postanowiły podjąć się tej epickiej
                        misji. Projekt Mars Reconquest został zainicjowany w
                        celu podboju Czerwonej Planety i rozpoczęcia procesu
                        terraformacji, aby uczynić ją drugim domem ludzkości.
                    </p>
                    <br />
                    <p>
                        Jako jeden z ochotników dołączasz do załogi
                        międzynarodowej misji, mającej na celu odkrycie tajemnic
                        Marsa, eksplorację jego powierzchni oraz rozwiązanie
                        licznych zadań, które stoją przed kolonizatorami.
                    </p>
                    <br />
                    <p>
                        Skanuj QR code'y, rozwiązuj zadania w kolejnych sekcjach
                        i pnij się w leaderboardzie, na najlepszych czekają
                        nagrody!
                    </p>
                </div>
            </div>
            <button
                onClick={() => navi('/')}
                style={{
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    width: '50%',
                    height: '4%',
                    borderRadius: 20,
                    alignSelf: 'center',
                    marginTop: 20,
                    fontWeight: 600,
                }}
            >
                OKEJ LECIMY 🚀
            </button>
        </Background>
    );
}
