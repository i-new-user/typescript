import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../../http/statuses";


import { RequestWithParams } from "./models/requestWithParams";
import { RequestWithParamsAndBody } from "./models/requestWithParamsAndBody";
import { RequestWithBody } from "./models/requestWithBody";
import { UriParamsPost } from "./models/uriParamsPost";


import { postService } from "../../domains/posts_service";
import { postQueryRepository } from "../../repositories/posts/query_repository";


import { PaginatorPostType } from "./types/paginatorPostType";
import { PostViewType } from "./types/postViewType";
import { PostInputType } from "./types/postInputType";
import { PostOutputType } from "./types/postOutputType";


import { blogsQueryRepository } from '../../repositories/blogs/query_repositories';


import { PaginatorCommentType } from './../comments/types/paginatorCommentType';


import { CommentInputType } from "../comments/types/commentInputType";
import { CommentOutputType } from "../comments/types/commentatorOutputType";

import { commentValid } from "../../middleware/comments_valid";

import { authMiddleware } from "../../middleware/authMiddleware";
import { basicAuth } from "../../middleware/basic_auth";
import { inputValidation } from "../../middleware/input_validator";
import { isBlogCustomValid } from "../../middleware/blog_custom_valid";
import { titleValid, shortDescriptionValid, contentValid, blogIdValid } from "../../middleware/posts_validator";



export const postsRouter = Router({})


postsRouter.get('/', async (req: Request, res: Response<PaginatorPostType>) => {

    const sortBy = req.query.sortBy as string ?? "createdAt"
    const sortDirection = req.query.sortDirection === undefined ? 'desc' : 'asc'
    const pageNumber = req.query.pageNumber as string ?? '1'
    const pageSize = req.query.pageSize as string ?? '10'

    const posts: PaginatorPostType = await postQueryRepository.findPosts(sortBy, sortDirection, pageNumber, pageSize)
    res.send(posts)
})

.get('/:id', async (req: RequestWithParams<UriParamsPost>, res: Response<PostOutputType | null>) => {

    const post = await postQueryRepository.findPostById(req.params.id)
    if(post){
        res.send(post)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})

.post('/', 

    basicAuth, titleValid, shortDescriptionValid, contentValid, blogIdValid, isBlogCustomValid, inputValidation,

    async (req: RequestWithBody<PostInputType>, res: Response<PostOutputType | null>) => {

    const {title, shortDescription, content, blogId} = req.body

    const blog = await blogsQueryRepository.findBlogById(blogId)

    if(!blog){
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

    const newPost: PostViewType | null  = await postService.createPost(title, shortDescription, content, blogId, blog.name)
    res.status(HTTP_STATUSES.CREATED_201).send(newPost)
    
})


.put('/:id', 

    basicAuth, titleValid, shortDescriptionValid, contentValid, blogIdValid, isBlogCustomValid, inputValidation,

    async (req: RequestWithParamsAndBody<UriParamsPost, PostInputType>, res: Response<PostOutputType | null>) => {

    const {  title, shortDescription, content, blogId} = req.body

    const idUpdate  = await postService.updatePost(req.params.id, title, shortDescription, content, blogId)
    if(idUpdate){
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})


.delete('/:id', 

    basicAuth,

    async (req: RequestWithParams<UriParamsPost>, res: Response) => {

    const isDeleted = await postService.deletePost(req.params.id)

    if(isDeleted){
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})



.get('/:id/comments', async (req: Request, res: Response<PaginatorCommentType>) => {
   
    const postId = req.params.id
    console.log(postId)


    const post = await postQueryRepository.findPostById(postId)
    console.log(post)

   
    if(!post){
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

    const sortBy = req.query.sortBy as string ?? "createdAt"
    const sortDirection = req.query.sortDirection === undefined ? 'desc' : 'asc'
    const pageNumber = req.query.pageNumber as string ?? '1'
    const pageSize = req.query.pageSize as string ?? '10'

    const comments: PaginatorCommentType = await postQueryRepository.findCommentsByPostId(postId, sortBy, sortDirection, pageNumber, pageSize)
   
    console.log(comments)
    if(comments){
        res.send(comments)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})


.post('/:id/comments', 
    
    authMiddleware, commentValid, inputValidation,

    async (req: RequestWithParamsAndBody<UriParamsPost, CommentInputType>, res: Response<CommentOutputType>) => {
       
    const postId = req.params.id

    const post = await postQueryRepository.findPostById(postId)
    if(!post){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
   
    const {content} = req.body

    const comment = await postService.createCommentByPostId(postId, content, (req as any).user)
    res.sendStatus(HTTP_STATUSES.CREATED_201).send(comment)
})