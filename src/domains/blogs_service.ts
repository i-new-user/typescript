import { blogsCollection } from "../db"
import { blogRepository } from "../repositories/blogs/command_repositories"


import { BlogViewType } from "../features/blogs/types/blogViewType"
import { BlogMongoDBType } from "../features/blogs/types/blogMongoDBType"




export const blogService = {
    async createBlog( name: string, description: string, websiteUrl: string): Promise<BlogViewType>{
       
            const newBlog: BlogMongoDBType = {
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
        return await blogRepository.updateBlog(id, name, description, websiteUrl)
    },

    async deleteBlog(id: string): Promise<boolean>{
        return await blogRepository.deleteBlog(id)
    },

    async deleteAllBlogs(){
        return await blogRepository.deleteAllBlogs()
    }
    
}