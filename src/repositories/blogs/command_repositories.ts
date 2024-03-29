import { ObjectId } from "mongodb";
import { blogsCollection } from "../../db";


import { BlogMongoDBType } from "../../features/blogs/types/blogMongoDBType";


export const blogRepository = {
    async createBlog(newBlog: BlogMongoDBType): Promise<BlogMongoDBType>{
            const result = await blogsCollection.insertOne(newBlog)
            return newBlog
    
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        const result = await blogsCollection.updateOne({_id: new ObjectId(id)}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})
        return result.matchedCount === 1
    },

    async deleteBlog(id: string): Promise<boolean> {
        const result =  await blogsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteAllBlogs(){
        return await blogsCollection.deleteMany({})
    }
}