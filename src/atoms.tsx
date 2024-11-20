import { atom } from "recoil";

export enum ItemType {
    "CARD" = "CARD",
}

export interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": ["a", "b"],
        Doing: ["c", "d", "e"],
        Done: ["f"],
    },
});