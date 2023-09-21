import { PostViewModel } from "../entity/postViewModel"

export type PaginatorPostModel = {
    pagesCount:	number
    page: number
    pageSize: number
    totalCount:	number
    items:	PostViewModel[]
}