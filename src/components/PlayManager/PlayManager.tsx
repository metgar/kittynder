import React, { useEffect, useRef, useState } from 'react'
import { CatData, Results, UserAction } from '../../models/models'
import { Viewer } from '../Viewer/Viewer'
import { actionMap, BUFFER_DATA, DEFAULT_RESULTS, loadCats, updateResultsByUserAction, useInterval } from './Playmanager.utils.';

interface PlayManagerProps {
    breedId: string,
    duration: number,
    manageDataPlay: (data: Results) => void,
    manageError: () => void;
}

export function PlayManager({ breedId, duration, manageDataPlay, manageError }: PlayManagerProps) {

    const [cat, setCat] = useState<CatData | undefined>(undefined);
    const [catList, setCatList] = useState<CatData[]>([]);

    const results = useRef<Results>(DEFAULT_RESULTS)

    const [loadingCats, setLoadingCats] = useState<boolean>(false);
    const [dataAvailable, setDataAvailable] = useState<boolean>(true);
    const pageData = useRef<number>(0);

    /** new cats loader */
    useEffect(() => {
        if (!loadingCats && catList.length < BUFFER_DATA && dataAvailable) {
            const fetchData = async () => {
                setLoadingCats(true);
                try {
                    const data = await loadCats(breedId, pageData.current);
                    setDataAvailable(!!data.length);
                    setCatList(cats => [...cats, ...data]);
                    pageData.current++;
                } catch (error) {
                    console.error('ERROR', error);
                    manageError();
                } finally {
                    setLoadingCats(false)
                }
            }
            fetchData();
        }
    }, [breedId, catList, dataAvailable, loadingCats, manageError])

    /** update cat list and results after user action */
    const callbackUserActionFn = (userAction: UserAction) => () => {
        results.current = updateResultsByUserAction(userAction, actionMap, results.current);
        setCatList(catList.slice(1));
    }

    /** manage cat to show based on catList */
    useEffect(() => {
        const firstCatId = catList[0]?.id;
        if (firstCatId && cat?.id !== firstCatId) {
            setCat(catList[0])
            results.current = { ...results.current, seen: results.current.seen + 1 }
        }
    }, [cat, catList, dataAvailable, loadingCats])

    /** end the game when there are no more cats available */
    useEffect(() => {
        if (!dataAvailable && !catList.length) {
            console.log('NO MORE DATA - END GAME');
            manageDataPlay(results.current);
        }
    }, [dataAvailable, catList.length, manageDataPlay])

    const [time, setTime] = useState<number>(duration);

    useInterval(() => {
        // start the countdown only after viewing the first cat
        if (results.current.seen) {
            setTime(time - 1);
        }
    });

    /** end the game when countdown reachs 0 */
    useEffect(() => {
        if (time <= 0) {
            console.log('GAME OVER');
            manageDataPlay(results.current);
        }
    }, [time, manageDataPlay]);


    return (
        <>
            {/* <div>time: {time}</div> */}
            {loadingCats && !catList.length && <p>Loading ...</p>}

            {cat && !!catList.length &&
                <Viewer userAction={callbackUserActionFn} data={cat}></Viewer>
            }

        </>
    )
}
