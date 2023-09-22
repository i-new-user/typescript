import { ObjectId, WithId } from 'mongodb';
import { PostOutputType } from '../../maping/post';
import { postsCollection } from '../../db';
import { PostMongoDBModel } from '../../features/posts/models/entity/postMongoDBModel';
import { PaginatorPostModel } from '../../features/posts/models/entity/postPaginator';
import { totalmem } from 'os';


export type PostOutputModel = {
    id: string
    title:	string
    shortDescription:	string
    content:	string
    blogId:	string
    blogName:	string
    createdAt: string
}

export const postQueryRepository = {

    async findPosts( sortDirection: 1 | -1, sortBy: string, pageNumber: string, pageSize: string): Promise<PaginatorPostModel> {

        const totalDocuments = await postsCollection.countDocuments()

        const posts: WithId<PostMongoDBModel>[] | [] = await postsCollection.find( {} )
                                                                            .sort( {[sortBy]: sortDirection} )
                                                                            .skip( (+pageNumber-1) * +pageSize)
                                                                            .limit( +pageSize )
                                                                            .toArray()

        return this._mapPostOutputModel(posts, totalDocuments, +pageNumber, +pageSize)

    },

    _mapPostOutputModel(posts: WithId<PostMongoDBModel>[], totalDocuments: number, pageNumber: number, pageSize: number): PaginatorPostModel {
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

    async findPostById(id: string): Promise<PostOutputModel | null> {

        const post: WithId<PostMongoDBModel> | null = await postsCollection.findOne({_id: new ObjectId(id)})

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