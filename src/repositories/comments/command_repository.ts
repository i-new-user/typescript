import { ObjectId } from "mongodb"
import { commentsCollection } from "../../db"


import { authMiddleware } from "../../middleware/authMiddleware"

export const commentsRepository = {

    authMiddleware,

    async updateComment(id: string, content: string): Promise<boolean>{
        const result =  await commentsCollection.updateOne({_id: new ObjectId(id)}, {$set: {content: content}})
        return result.matchedCount === 1
    },

    async deleteComment(id: string): Promise<boolean>{
        const result =  await commentsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteAllComments(){
        return await commentsCollection.deleteMany({})
    }
}