import { useMutation } from "@tanstack/react-query";
import api from "../utils/api";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../recoil/tokenAtom";
import { useLocation, useNavigate } from "react-router-dom";

interface IAuth {
    email: string;
    password: string;
}

// 로그인 API 호출 함수
const fetchSignin = (authData: IAuth) => {
    return api.post("/users/signin", authData);
};

// 로그인 커스텀 훅
export const useSigninMutation = () => {
    const setAccessToken = useSetRecoilState(tokenState);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.redirectedFrom?.pathname || "/";

    return useMutation({
        mutationFn: fetchSignin,
        onSuccess: (response) => {
            const { accessToken } = response.data;
            setAccessToken(accessToken);
            navigate(from);
        },
        onError: (error) => {
            // console.log(error);
        },
    });
};

// 로그아웃 함수
export const useLogout = () => {
    const setAccessToken = useSetRecoilState(tokenState);
    const navigate = useNavigate();

    const logout = () => {
        setAccessToken(undefined);
        localStorage.removeItem("localStorage");
        navigate("/login");
    }

    return { logout };
}