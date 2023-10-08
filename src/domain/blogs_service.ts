import { blogsCollection } from './../db';
import { blogsRepository } from '../repositories/blogs/command_repositories';

import { BlogViewModel } from './../features/blogs/models/entity/blogViewModel';
import { BlogMongoDBModel } from '../features/blogs/models/entity/blogMongoDBModel';


export const blogsService = {

    async createBlog( name: string, description: string, websiteUrl: string): Promise<BlogViewModel>{

        
        const newBlog: BlogMongoDBModel = {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        const result = await blogsCollection.insertOne(newBlog)

          
        return   {
            id: String(result.insertedId),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: newBlog.createdAt,
            isMembership: newBlog.isMembership
        }
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        return await blogsRepository.updateBlog(id, name, description, websiteUrl)
    },

    async deleteBlog(id: string): Promise<boolean>{
        return await blogsRepository.deleteBlog(id)
    },

    async deleteAllBlogs(){
        return await blogsRepository.deleteAllBlogs()
    }

}