import { CommentOutputType } from './../../features/comments/types/commentatorOutputType';
import { commentsCollection, postsCollection } from "../../db"


import { PaginatorPostType } from "../../features/posts/types/paginatorPostType"
import { PostMongoDBType } from "../../features/posts/types/postMongoDBType"
import { PostOutputType } from "../../features/posts/types/postOutputType"


import { ObjectId, WithId } from "mongodb"

import { PaginatorCommentType } from '../../features/comments/types/paginatorCommentType';
import { CommentMongoDBType } from '../../features/comments/types/commentatorMongoDBType';


export const postQueryRepository = {

    async findPosts(sortBy: string, sortDirection: 1 | -1, pageNumber: string, pageSize: string ): Promise<PaginatorPostType> {

        const totalDocuments = await postsCollection.countDocuments({})

        const posts: WithId<PostMongoDBType>[] | [] = await postsCollection.find({})
                                                                            .sort({[sortBy]: sortDirection})
                                                                            .skip((+pageNumber - 1) * +pageSize)
                                                                            .limit(+pageSize)
                                                                            .toArray()

        return this._mapPostOutputModel(posts, totalDocuments, +pageNumber, +pageSize)                                                                    
    },
    
    _mapPostOutputModel(posts: WithId<PostMongoDBType>[], totalDocuments: number, pageNumber: number, pageSize: number): PaginatorPostType{

        return{
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

    async findPostById(id: string): Promise<PostOutputType | null>{

        const post: WithId<PostMongoDBType> | null= await postsCollection.findOne( {_id: new ObjectId(id)} )
        
        if(post){
            return{
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

    async findPostByIdComments(id: string, sortBy: string, sortDirection: 1 | -1, pageNumber: string, pageSize: string): Promise<PaginatorCommentType>{
        
        const totalDocuments = await commentsCollection.countDocuments({})

        const comments: WithId<CommentMongoDBType>[] | [] = await commentsCollection.find({})
                                                                                .sort({[sortBy]: sortDirection})
                                                                                .skip((+pageNumber - 1) * +pageSize)
                                                                                .limit(+pageSize)
                                                                                .toArray()

                                                                                
        return this._mapCommentsOutputModel(comments, totalDocuments, +pageNumber, +pageSize)
    },
    
    _mapCommentsOutputModel(comments: WithId<CommentMongoDBType>[], totalDocuments: number, pageNumber: number, pageSize: number): PaginatorCommentType {
        return{
            pagesCount: Math.ceil(totalDocuments/pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalDocuments,
            items:  comments.map( comment => ({
                id: String(comment._id),
                content: comment.content,
                commentatorInfo: {
                  userId: comment.commentatorInfo.userId,
                  userLogin: comment.commentatorInfo.userLogin,
                },
                createdAt: new Date().toISOString()
            })) 
        }
    },

    async findPostByIdComment(id: string): Promise<CommentOutputType | null>{

        const comment: WithId<CommentMongoDBType> | null= await commentsCollection.findOne( {_id: new ObjectId(id)} )
        
        if(comment){
            return{
                id: String(comment._id),
                content: comment.content,
                commentatorInfo: {
                userId: comment.commentatorInfo.userId,
                userLogin: comment.commentatorInfo.userLogin
                },
                createdAt: comment.createdAt
            }
        } else {
            return null
        }
    },



}