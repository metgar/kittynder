import { BreedData, PlayState } from "../../models/models";

export const isSettingsVisible = (playState: PlayState): boolean => playState === PlayState.SETTING;
export const isPlayVisible = (playState: PlayState): boolean => playState === PlayState.PLAY;
export const isRecapVisible = (playState: PlayState): boolean => playState === PlayState.RESULT;
export const isErrorVisible = (playState: PlayState): boolean => playState === PlayState.ERROR;

export const loadBreeds = async (): Promise<BreedData[]> => {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/breeds`);
    if (!response.ok) {
        throw new Error('Error loading data');
    }
    const data = await response.json();
    const breeds = data.map(({ id, name }: BreedData) => ({ id, name }));
    return breeds;
}
