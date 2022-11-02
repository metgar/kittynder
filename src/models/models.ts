export interface CatData {
    id: string;
    url: string;
    energy: number;
    affection: number;
    intelligence: number;
}

export enum UserAction {
    LIKE,
    DISLIKE,
    SKIP
}

export type UserActionFn = (userAction: UserAction) => any

export interface Results {
    seen: number,
    likes: number,
    dislikes: number,
    skipped: number
}

export type ActionResultMap = { [k in UserAction]: keyof Results }

export interface GameSettingsByUser {
    duration: number,
    breed: string
}

export interface BreedData {
    id: string,
    name: string
}

export enum PlayState {
    SETTING,
    PLAY,
    RESULT,
    ERROR
}