import { BlogViewModel } from "./blogViewModel"

export type PaginatorBlogModel = {
    pagesCount:	number
    page: number
    pageSize: number
    totalCount:	number
    items:	BlogViewModel[]
}