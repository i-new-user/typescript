import { PostViewType } from "./postViewType"

export type PaginatorPostType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: PostViewType[]
}
    
       
    