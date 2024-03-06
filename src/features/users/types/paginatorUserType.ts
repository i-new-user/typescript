import { UserViewType } from "./userViewType"

export type PaginatorUserType = {
    pagesCount:	number
    page: number
    pageSize: number
    totalCount: number
    items: UserViewType[]
}