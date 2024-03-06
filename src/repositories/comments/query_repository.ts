import { CommentOutputType } from './../../features/comments/types/commentatorOutputType';
import { commentsCollection } from "../../db"
import { CommentMongoDBType } from "../../features/comments/types/commentatorMongoDBType"

import { PaginatorCommentType } from "../../features/comments/types/paginatorCommentType"

import { ObjectId, WithId } from "mongodb"

import { CommentViewType } from "../../features/comments/types/commentatorViewType"


export const commentsQueryRepository = {

    async findCommentById(id: string): Promise<CommentOutputType | null>{
        const comment: WithId<CommentMongoDBType> | null= await commentsCollection.findOne( {_id: new ObjectId(id)})
        if(comment){
            return {
                id: String(comment._id),
                content: comment.content,
                commentatorInfo: {
                  userId: comment.commentatorInfo.userId,
                  userLogin: comment.commentatorInfo.userLogin
                },
                createdAt: comment.createdAt
            }
        } else {
            return null
        }
    }
}