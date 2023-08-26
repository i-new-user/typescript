
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

import { HTTP_STATUSES } from "../http/statuses";

import { PostViewModel } from "../models/posts/view_model";
import { PostInputModel } from "../models/posts/input_model";

import { GetById } from "../types/posts/get_by_id";
import { ReqBody } from "../types/posts/req_body";
import { ReqParamsAndBodyPost } from "../types/posts/req_params_and_body";
import { ReqParams } from "../types/posts/req_params";
import { ReqQuery } from "../types/posts/req_query";

import { postsRepository } from "../repositories/posts_repositoriy";
import { blogsRepository } from "../repositories/blogs_repositoriy";

import { basicAuth } from "../middleware/basic_auth";
import { inputValidation } from "../middleware/input_validator";
import { isBlogCustomValid } from "../middleware/blog_custom_validator";


export const postsRouter = Router({})

let titleValid = body('title').isString().trim().isLength({min: 1, max:30})
let shortDescriptionValid = body('shortDescription').trim().isString().isLength({min: 1, max:100})
let contentValid = body('content').trim().isString().isLength({min: 1, max:1000})
let blogIdValid = body('blogId').isString()



postsRouter.get('/', (req: Request, res: Response<PostViewModel[]>) => {

    let posts = postsRepository.findPosts()
    res.send(posts)
})

.get('/:id', (req: ReqParams<GetById>, res: Response<PostViewModel>) => {

    let post = postsRepository.findPostById(req.params.id)
   

    if(post){
      res.send(post)
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})

.delete('/:id',
    basicAuth, 
    
    (req: ReqParams<GetById>, res: Response)  => {

    let isDeleted = postsRepository.deletePost(req.params.id)

    if(isDeleted){
      res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
      res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})
  
  
.post('/', 

  basicAuth, titleValid, shortDescriptionValid, contentValid, blogIdValid, inputValidation,
  
  (req: ReqBody<PostViewModel>, res: Response<PostViewModel>)  => {
 
  const {id, title, shortDescription, content, blogId, blogName} = req.body
  const blog = blogsRepository.findBlogById(blogId)
 
  

  if(!blog){
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
      
  let newPosts = postsRepository.createPost( id, title, shortDescription, content, blogId, blogName )
      res.status(HTTP_STATUSES.CREATED_201).send(newPosts)
})
  
  
.put('/:id', 

  basicAuth, titleValid, shortDescriptionValid, contentValid, blogIdValid, inputValidation,
  
  ( req: ReqParamsAndBodyPost<GetById, PostInputModel>, res: Response<PostViewModel>)  => {
  
  let isUpdate = postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    
  if(isUpdate){
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
  
})  
  
  
  
.delete('/__test__/data', 

  basicAuth, 
  
  (req: Request, res: Response) => {
    res.send(HTTP_STATUSES.NO_CONTENT_204)
})
  