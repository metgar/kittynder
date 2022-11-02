import { useEffect, useRef } from "react";
import { ActionResultMap, CatData, Results, UserAction } from "../../models/models";

// manage countdown
export function useInterval(callback: Function) {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => { savedCallback.current?.(); }
    let id = setInterval(tick, 1000);
    return () => { clearInterval(id); }
  }, []);
}

export const BUFFER_DATA = 3;

export const DEFAULT_RESULTS: Results = {
  seen: 0,
  likes: 0,
  dislikes: 0,
  skipped: 0
}

/** map user action to results fields */
export const actionMap: ActionResultMap = {
  [UserAction.LIKE]: 'likes',
  [UserAction.DISLIKE]: 'dislikes',
  [UserAction.SKIP]: 'skipped',
}

export const loadCats = async (breedId: string, page: number): Promise<CatData[]> => {

  const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/images/search?limit=10&has_breeds=1&order=ASC&breed_ids=${breedId}&page=${page}`, {
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY!,
    }
  });

  if (!response.ok) {
    throw new Error('Error loading data');
  }

  const data = await response.json();
  const breeds: CatData[] = data.map((results: any): CatData => ({
    id: results.id,
    url: results.url,
    energy: results.breeds[0].energy_level,
    affection: results.breeds[0].affection_level,
    intelligence: results.breeds[0].intelligence,
  }));

  return breeds;
}

// calculate new results after user action
export const updateResultsByUserAction = (userAction: UserAction, actionMap: ActionResultMap, results: Results): Results => {
  const targetKey = actionMap[userAction];
  const newResult = { ...results, [targetKey]: results[targetKey] + 1 };
  return newResult;
}

