import { UserViewModel } from "./userViewModel";

export type PaginatorUserModel = {
    pagesCount:	number
    page: number
    pageSize: number
    totalCount:	number
    items:	UserViewModel[]
}