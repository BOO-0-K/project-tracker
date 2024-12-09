import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../utils/api"

export interface ITemplate {
    id: number;
    name: string;
}

interface ITemplates {
    templates: ITemplate[];
}

export interface ICategory {
    id: number;
    templateId: number;
    categoryId: number;
    categoryName: string;
    createdAt: string;
}

interface ICategories {
    templateCategories: ICategory[];
}

interface QueryData extends QueryFunctionContext<[string, number]> {}

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

// 템플릿 별 카테고리 리스트 호출 함수
const fetchTemplateCategories = (queryData: QueryData) => {
    const id = queryData.queryKey[1];
    return api.get(`/templates/${id}/categories`);
}

// 템플릿 별 카테고리 리스트 커스텀 훅
export const useTemplateCategoriesQuery = (id: number) => {
    return useQuery({
        queryKey: ["categories", id],
        queryFn: fetchTemplateCategories,
        select: (data) => {
            return data.data as ICategories;
        },
    });
}