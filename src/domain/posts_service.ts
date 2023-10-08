import { postsRepository } from '../repositories/posts/command_repositories';
import { postsCollection } from '../db';

import { PostViewModel } from "../features/posts/models/entity/postViewModel";
import { PostMongoDBModel } from '../features/posts/models/entity/postMongoDBModel';




export const postsService = {

    async createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<PostViewModel>{
       
      
        const newPost: PostMongoDBModel = {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName,
            createdAt:  new Date().toISOString(),
          }

        const result = await postsCollection.insertOne(newPost)
       
        
        
        return   {
            id: String(result.insertedId),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName,
            createdAt:  newPost.createdAt
          }
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean>{
        return await postsRepository.updatePost(id, title, shortDescription, content, blogId)
    },

    async deletePost(id: string): Promise<boolean>{
        return await postsRepository.deletePost(id)
    },

    async deleteAllPost(){
        return await postsRepository.deleteAllPost()
    }
}