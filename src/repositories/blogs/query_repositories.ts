import { blogsCollection } from "../../db"
import { postsCollection } from "../../db"
import { ObjectId, WithId } from "mongodb"

import { BlogMongoDBModel } from "../../features/blogs/models/entity/blogMongoDBModel"
import { BlogOutputModel } from "../../features/blogs/models/entity/blogOutputModel"
import { PostOutputModel } from "../posts/query_repositories"
import { PaginatorBlogModel } from "../../features/blogs/models/entity/blogPaginator"


export const blogsQueryRepository = {

    async findBlogs( searchNameTerm: string | null, sortDirection: 1 | -1, sortBy: string, pageNumber: string, pageSize: string ): Promise<PaginatorBlogModel> {

        const totalDocuments = await blogsCollection.countDocuments()

        const blogs: WithId<BlogMongoDBModel>[] | [] = await blogsCollection.find({})
                                                                            .sort({[sortBy]: sortDirection})
                                                                            .skip((+pageNumber-1) * +pageSize)
                                                                            .limit(+pageSize)
                                                                            .toArray()
                                                                            

        return this._mapBlogOutputModel(blogs, totalDocuments, +pageNumber, +pageSize)

    },

   _mapBlogOutputModel(blogs: WithId<BlogMongoDBModel>[], totalDocuments: number, pageNumber: number, pageSize: number): PaginatorBlogModel {
        return { 
            pagesCount: Math.ceil(totalDocuments/pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalDocuments,
            items:  blogs.map( blog => ({
                id: String(blog._id),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership
            })) 
        } 
    },



    async findBlogById(id: string): Promise<BlogOutputModel | null> {
        const blog: WithId<BlogMongoDBModel> | null = await blogsCollection.findOne({_id: new ObjectId(id)})
        
        if(blog){
            return {
                id:  String(blog._id),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership
            }
        } else {
            return null
        }

    },

    async findBlogByIdPosts(id: string): Promise<PostOutputModel | null> {

       
        const post = await postsCollection.findOne({_id: new ObjectId(id)})
        
        if(post){
            return {
                id: String(post._id),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            }
        } else {
            return null
        }

    },


    

}