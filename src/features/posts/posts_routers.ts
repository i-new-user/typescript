import { Request, Response, Router } from "express";

import { HTTP_STATUSES } from "../../http/statuses";

import { postsService } from "../../domain/posts_service";
import { blogsQueryRepository } from "../../repositories/blogs/query_repositories";
import { postQueryRepository } from "../../repositories/posts/query_repositories";

import { PostViewModel } from "./models/entity/postViewModel";
import { PostInputModel } from "./models/entity/postInputModel";

import { ReqBody } from "./models/req_res/req_body";
import { ReqParams } from "./models/req_res/req_params";
import { ReqParamsAndBodyPost } from "./models/req_res/req_params_and_body";
import { GetById } from "./models/req_res/get_by_id";

import { basicAuth } from "../../middleware/basic_auth";
import { inputValidation } from "../../middleware/input_validator";
import { isBlogCustomValid } from "../../middleware/blog_custom_validator";
import { titleValid, shortDescriptionValid, contentValid, blogIdValid } from "../../middleware/posts_validators";
import { PaginatorPostModel } from "./models/entity/postPaginator";


export const postsRouter = Router({})


postsRouter.get('/', async (req: Request, res: Response<PaginatorPostModel>) => {

  const sortBy = req.query.sortBy as string ?? "createdAt"
  const sortDirection = req.query.sortDirection === "asc" ? 1 : -1
  const pageNumber = req.query.pageNumber as string ?? '1'
  const pageSize = req.query.pageSize as string ?? '10'

  let foundEntityes: PaginatorPostModel = await postQueryRepository.findPosts( sortDirection, sortBy, pageNumber, pageSize )
  res.send(foundEntityes)
})

.get('/:id', async (req: ReqParams<GetById>, res: Response<PostViewModel>) => {

    let post = await postQueryRepository.findPostById(req.params.id)
    
    if(post){
      res.send(post)
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})


.delete('/:id',
    basicAuth, 
    
    async (req: ReqParams<GetById>, res: Response)  => {

    let isDeleted = await postsService.deletePost(req.params.id)

    if(isDeleted){
      res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
      res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})
  
  
.post('/', 

  basicAuth, titleValid, shortDescriptionValid, contentValid, blogIdValid, isBlogCustomValid, inputValidation,
  
  async (req: ReqBody<PostInputModel>, res: Response<PostViewModel>)  => {
  
  const { title, shortDescription, content, blogId} = req.body

  const blog = await blogsQueryRepository.findBlogById(blogId)

  if(!blog){
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
      
  let newPosts = await postsService.createPost(title, shortDescription, content, blogId, blog.name)
      res.status(HTTP_STATUSES.CREATED_201).send(newPosts)
})
  
  
.put('/:id', 

  basicAuth, titleValid, shortDescriptionValid, contentValid, blogIdValid, isBlogCustomValid, inputValidation,
  
  async ( req: ReqParamsAndBodyPost<GetById, PostInputModel>, res: Response<PostViewModel>)  => {
  
  let isUpdate = await postsService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
  
  if(isUpdate){
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
  } else {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
  
})  
  
 
  
.delete('/testing/all-date', 

  basicAuth, 
  
  async (req: Request, res: Response) => {
    await res.send(HTTP_STATUSES.NO_CONTENT_204)
})
