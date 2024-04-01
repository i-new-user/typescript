import { commentsCollection, postsCollection } from "../db"

import { postRepository } from "../repositories/posts/command_repository"


import { PostMongoDBType } from "../features/posts/types/postMongoDBType"
import { PostViewType } from "../features/posts/types/postViewType"

import { CommentMongoDBType } from "../features/comments/types/commentatorMongoDBType"
import { CommentViewType } from "../features/comments/types/commentatorViewType"

import { UserOutputType } from "../features/users/types/userOutputType"

import { usersQueryRepository } from "../repositories/users/query_repository"

import { jwtService } from "../application/jwtService"


export const postService = {

    async createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<PostViewType>{



        const newPost: PostMongoDBType = {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName,
            createdAt: new Date().toISOString()
        }

        const result = await postsCollection.insertOne(newPost)

            return {
                id: String(result.insertedId),
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName,
                createdAt: newPost.createdAt
            }
    },

    async updatePost( id: string, title: string ,shortDescription: string ,content: string, blogId: string): Promise<boolean>{
        return await postRepository.updatePost(id, title, shortDescription, content, blogId)
    },

    async deletePost(id: string): Promise<boolean>{
        return await postRepository.deletePost(id)
    },

    async deleteAllPost(){
        return await postRepository.deleteAllPosts()
    },

    async createCommentByPostId(postId: string, content: string, user:  UserOutputType): Promise<CommentViewType>{

        const newComment: CommentMongoDBType = {
            content: content,
            postId: postId,
            commentatorInfo: {
                userId: user.id,
                userLogin: user.login
              },
            createdAt: new Date().toISOString()
        }

        const result = await commentsCollection.insertOne(newComment)

            return {
                id: String(result.insertedId),
                content: content,
                commentatorInfo: {
                  userId: newComment.commentatorInfo.userId,
                  userLogin: newComment.commentatorInfo.userLogin
                },
                createdAt: newComment.createdAt
            }
            
    },


}