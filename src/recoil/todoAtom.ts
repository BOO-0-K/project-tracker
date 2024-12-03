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
    default: [
        {
            id: 1,
            text: "To Do",
            cards: [],
        },
        {
            id: 2,
            text: "Doing",
            cards: [],
        },
        {
            id: 3,
            text: "Done",
            cards: [],
        },
    ]
});