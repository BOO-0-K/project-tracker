import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

export interface ITemplate {
    id: number;
    name: string;
}

interface ITemplates {
    templates: ITemplate[];
}

// 템플릿 리스트 호출 함수
const fetchTemplates = () => {
    return api.get("/templates");
}

// 템플릿 리스트 커스텀 훅
export const useTemplatesQuery = () => {
    return useQuery({
        queryKey: ["templates"],
        queryFn: fetchTemplates,
        select: (data) => {
            return data.data as ITemplates;
        },
    });
}