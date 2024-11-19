import { atom } from "recoil";

export enum ItemType {
    "CARD" = "CARD",
}

export const toDoState = atom({
    key: "toDo",
    default: ["a", "b", "c", "d", "e", "f"],
});