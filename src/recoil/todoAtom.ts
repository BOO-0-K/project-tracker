import { atom } from "recoil";

export enum ItemType {
    "CARD" = "CARD",
    "BOARD" = "BOARD",
}

export interface ICard {
    id: number;
    text: string;
}

export interface IBoard {
    id: number;
    text: string;
    cards: ICard[];
}

export const toDoState = atom<IBoard[]>({
    key: "toDo",
    default: []
});