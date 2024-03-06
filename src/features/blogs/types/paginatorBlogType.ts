import { BlogViewType } from "./blogViewType"

export type PaginatorBlogType = {
    pagesCount:	number
    page: number
    pageSize: number
    totalCount: number
    items: BlogViewType[]
}