import { Request, Response, Router } from "express";

import { HTTP_STATUSES } from "../../http/statuses";

import { blogsService } from '../../domain/blogs_service';
import { blogsQueryRepository } from '../../repositories/blogs/query_repositories';

import { postsService } from "../../domain/posts_service";

import { BlogViewModel } from "./models/entity/blogViewModel";
import { BlogInputModel } from './models/entity/blogInputModel';
import { BlogModel } from './models/entity/blogModel';
import { BlogMongoDBModel } from "./models/entity/blogMongoDBModel";
import { PaginatorBlogModel } from "./models/entity/blogPaginator";
import { PaginatorPostModel } from "../posts/models/entity/postPaginator";

import { ReqBody } from "./models/req_res/req_body";
import { ReqParams } from "./models/req_res/req_params";
import { ReqParamsAndBody } from "./models/req_res/req_params_and_body";
import { GetById } from "./models/req_res/get_by_id";

import { basicAuth } from "../../middleware/basic_auth";
import { inputValidation } from '../../middleware/input_validator';
import { nameValid, descriptionValid, websiteUrlValid } from "../../middleware/blogs_validators";
import { PostOutputModel, postQueryRepository } from "../../repositories/posts/query_repositories";
import { WithId } from "mongodb";
import { BlogOutputModel } from "./models/entity/blogOutputModel";
import { PostInputModel } from "../posts/models/entity/postInputModel";


export const blogsRouter = Router({})
                                                                                                

blogsRouter.get('/', async ( req: Request, res: Response<PaginatorBlogModel>)  => {

  const searchNameTerm = null
  const sortBy = req.query.sortBy ?? "createdAt"
  const sortDirection = req.query.sortDirection === "asc" ? 1 : -1
  const pageNumber = 1
  const pageSize = 10

    let foundEntityes: PaginatorBlogModel = await blogsQueryRepository.findBlogs(searchNameTerm, sortDirection, sortBy as string, String(pageNumber), String(pageSize) )
    res.send(foundEntityes)
})




.get('/:id/posts', async ( req: Request, res: Response<PaginatorPostModel>)  => {

  const isEntity: BlogOutputModel | null = await blogsQueryRepository.findBlogById(req.params.id)

  if(!isEntity){
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }

  const searchNameTerm = null
  const sortBy = req.query.sortBy ?? "createdAt"
  const sortDirection = req.query.sortDirection === "asc" ? 1 : -1
  const pageNumber = 1
  const pageSize = 10


  let foundEntity: PaginatorPostModel = await blogsQueryRepository.findBlogByIdPosts(req.params.id, searchNameTerm, sortDirection, sortBy as string, String(pageNumber), String(pageSize))
 
  if(foundEntity){
    res.send(foundEntity)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
})



.get('/:id', async ( req: ReqParams<GetById >, res: Response<BlogViewModel | null>)  => {

  let foundEntity: BlogModel | null = await blogsQueryRepository.findBlogById(req.params.id)
 
  if(foundEntity){
    res.send(foundEntity)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
})


.post('/:id/posts',

    basicAuth, nameValid, descriptionValid, websiteUrlValid, inputValidation,

    async (req: ReqBody<PostInputModel>, res: Response<PostOutputModel>)  => {
   

    let {title, shortDescription, content, blogId} = req.body

    const blog = await blogsQueryRepository.findBlogById(blogId)

    if(!blog){
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

    let newPost: PostOutputModel = await postsService.createPost( title, shortDescription, content, blogId, blog.name)
    res.status(HTTP_STATUSES.CREATED_201).send(newPost)
})

.post('/',

    basicAuth, nameValid, descriptionValid, websiteUrlValid, inputValidation,

    async (req: ReqBody<BlogInputModel>, res: Response<BlogViewModel>)  => {

    let {name, description, websiteUrl} = req.body

    let newBlog = await blogsService.createBlog( name, description, websiteUrl)
    res.status(HTTP_STATUSES.CREATED_201).send(newBlog)
})


.put('/:id',

  basicAuth, nameValid, descriptionValid, websiteUrlValid, inputValidation,

  async ( req: ReqParamsAndBody<GetById, BlogInputModel>, res: Response<BlogViewModel>)  => {

  let isUpdate = await blogsService.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
  
  if(isUpdate){
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }

})  


.delete('/:id', 

basicAuth,

async (req: ReqParams<GetById>, res: Response)  => {

let isDeleted = await blogsService.deleteBlog(req.params.id)

  if(isDeleted){
    res.send(HTTP_STATUSES.NO_CONTENT_204)
  } else {
    res.send(HTTP_STATUSES.NOT_FOUND_404)
  }
})


.delete('/testing/all-data',

  basicAuth, 

  async (req: Request, res: Response) => {
    await res.send(HTTP_STATUSES.NO_CONTENT_204)
})
