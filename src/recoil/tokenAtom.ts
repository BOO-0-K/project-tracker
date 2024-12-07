import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "localStorage",
    storage: localStorage,
});

export const tokenState = atom<string | undefined>({
    key: "token",
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});

export const isLoginSelector = selector({
    key: "isLogin",
    get: ({get}) => !!get(tokenState),
});