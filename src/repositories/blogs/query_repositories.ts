import { blogsCollection, postsCollection } from "../../db";


import { BlogMongoDBType } from "../../features/blogs/types/blogMongoDBType";
import { BlogViewType } from "../../features/blogs/types/blogViewType";
import { BlogOutputType } from "../../features/blogs/types/blogOutputType";
import { PaginatorBlogType } from "../../features/blogs/types/paginatorBlogType";


import { PaginatorPostType } from "../../features/posts/types/paginatorPostType";
import { PostMongoDBType } from './../../features/posts/types/postMongoDBType';


import { ObjectId, WithId } from "mongodb";




export const blogsQueryRepositoty = {

    async findBlogs(searchNameTerm: string | null,  sortBy: string, sortDirection: 1 | -1, pageNumber: string, pageSize: string ): Promise<PaginatorBlogType> {
        
        const totalDocuments = await blogsCollection.countDocuments({name: {$regex: searchNameTerm ?? '', $options: 'i'}})
        
        const blogs: WithId<BlogMongoDBType>[] | [] =   await blogsCollection.find({name: {$regex: searchNameTerm ?? '', $options: 'i'}})
                                                                           .sort({[sortBy]: sortDirection})
                                                                           .skip((+pageNumber - 1) * +pageSize)
                                                                           .limit(+pageSize)
                                                                           .toArray()
        
        return this._mapBlogOutputModel(blogs, totalDocuments, +pageNumber, +pageSize)
    }, 

    _mapBlogOutputModel(blogs: WithId<BlogMongoDBType>[], totalDocuments: number, pageNumber: number, pageSize: number): PaginatorBlogType{
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



    async findBlogById(id: string): Promise<BlogOutputType | null>{
        const blog: WithId<BlogMongoDBType> | null =  await blogsCollection.findOne({_id: new ObjectId(id)})
        if(blog){
            return {
                id: String(blog._id),
                name: blog.name,
                description:  blog.description,
                websiteUrl:  blog.websiteUrl,
                createdAt:  blog.createdAt,
                isMembership:  blog.isMembership
            }
        } else {
            return null
        }
    }, 


    async findBlogByIdPosts(id: string,  sortBy: string, sortDirection: -1 | 1, pageNumber: string, pageSize: string ): Promise<PaginatorPostType> {
        
        const totalDocuments = await blogsCollection.countDocuments({blogId: id})
        
        const posts: WithId<PostMongoDBType>[] | [] =   await postsCollection.find({blogId: id})
                                                                           .sort({[sortBy]: sortDirection})
                                                                           .skip((+pageNumber - 1) * +pageSize)
                                                                           .limit(+pageSize)
                                                                           .toArray()

        return this._mapPostOutputModel(posts, totalDocuments, +pageNumber, +pageSize)
    }, 

    _mapPostOutputModel(posts: WithId<PostMongoDBType>[], totalDocuments: number, pageNumber: number, pageSize: number): PaginatorPostType{
        return {
            pagesCount: Math.ceil(totalDocuments/pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalDocuments,
            items:  posts.map( post => ({
                id: String(post._id),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            })) 
        }
    },


   
}