export type CommentMongoDBType = {
    content: string
    commentatorInfo: {
        userId:	string
        userLogin:string
    }
    createdAt:	string
}