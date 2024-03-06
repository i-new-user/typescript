export type CommentatorInfoType = {
    userId:	string
    userLogin:	string
}

export type CommentViewType = {
    id:	string
    content: string
    commentatorInfo: CommentatorInfoType
    createdAt:	string
}

export type PaginatorCommentType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: CommentViewType[]
}