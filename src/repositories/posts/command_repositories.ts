import { postsCollection } from '../../db';
import { PostMongoDBModel } from '../../features/posts/models/entity/postMongoDBModel';
import { ObjectId, WithId } from 'mongodb';


export const postsRepository = {

    async createPost(newPost: PostMongoDBModel): Promise<PostMongoDBModel>{
        const result = await postsCollection.insertOne(newPost)
        return newPost
    },

    


    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean>{

        const result = await postsCollection.updateOne({_id: new ObjectId(id)}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
        return result.matchedCount === 1
    },

    async deletePost(id: string): Promise<boolean>{
       const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
       return result.deletedCount === 1
    },

    async deleteAllPost(){
        return await postsCollection.deleteMany({})
    }
}