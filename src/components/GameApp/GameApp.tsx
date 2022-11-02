import React, { useEffect, useRef, useState } from 'react'
import { BreedData, GameSettingsByUser, PlayState, Results } from '../../models/models'
import { PlayManager } from '../PlayManager/PlayManager';
import { Recap } from '../Recap/Recap';
import { ChoiceSelector } from '../ChoiceSelector/ChoiceSelector';
import { isErrorVisible, isPlayVisible, isRecapVisible, isSettingsVisible, loadBreeds } from './GameApp.utils';


export function GameApp() {

    const [playState, setPlayState] = useState<PlayState>(PlayState.SETTING)
    const [duration, setDuration] = useState<number | undefined>(undefined);
    const [resultData, setResultData] = useState<Results | undefined>(undefined)
    const [breedList, setBreedList] = useState<BreedData[] | undefined>(undefined);
    const breedId = useRef<string | undefined>(undefined);

    /** state / page callbacks */
    const manageDataSettings = (data: GameSettingsByUser) => {
        setDuration(data.duration);
        breedId.current = data.breed;
        setPlayState(PlayState.PLAY);
    };

    const manageDataPlay = (data: Results) => {
        setResultData(data);
        breedId.current = undefined;
        setPlayState(PlayState.RESULT);
    };

    const manageNewGame = () => {
        setResultData(undefined);
        setDuration(undefined);
        setPlayState(PlayState.SETTING);
    };

    const manageError = () => {
        setResultData(undefined);
        setDuration(undefined);
        setPlayState(PlayState.ERROR);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadBreeds();
                setBreedList([...data]);
            } catch (error) {
                console.error('ERROR', error);
                manageError();
            }
        }
        fetchData();
    }, [])


    return (
        <>
            {isSettingsVisible(playState) && !!breedList &&
                <ChoiceSelector breeds={breedList} manageDataSettings={manageDataSettings}></ChoiceSelector>
            }

            {isPlayVisible(playState) && breedId.current != null && duration != null &&
                <PlayManager breedId={breedId.current} duration={duration} manageDataPlay={manageDataPlay} manageError={manageError}></PlayManager>
            }

            {isRecapVisible(playState) && !!resultData &&
                <Recap resultData={resultData} manageNewGame={manageNewGame}></Recap>
            }

            {isErrorVisible(playState) && <div>ERROR RETRIEVING DATA</div>}

        </>
    )
}
