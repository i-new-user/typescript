import { commentsCollection, postsCollection } from "../../db"


import { ObjectId } from "mongodb"

import { PostMongoDBType } from "../../features/posts/types/postMongoDBType"

import { CommentMongoDBType } from "../../features/comments/types/commentatorMongoDBType"


export const postRepository = {

    async createPost(newPost: PostMongoDBType): Promise<PostMongoDBType>{
        const result = await postsCollection.insertOne(newPost)
        return newPost
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean>{
        const result = await postsCollection.updateOne({_id: new ObjectId(id)}, {$set: {title, shortDescription, content, blogId}})
        return result.matchedCount === 1
    },

    async deletePost(id: string): Promise<boolean>{
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteAllPosts(){
        return await postsCollection.deleteMany({}) 
    },

    async createCommentByPostId(newComment: CommentMongoDBType): Promise<CommentMongoDBType>{
        const result = await commentsCollection.insertOne(newComment)
        return newComment
    },

    
}