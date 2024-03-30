import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../../http/statuses";


import { RequestWithParams } from "./models/requestWithParams";
import { RequestWithBody } from "./models/requestWithBody";
import { RequestWithQuery } from "./models/requestWithQuery";
import { RequestWithParamsAndBody } from "./models/requestWithParamsAndBody";
import { UriParamsBlog } from "./models/uriParamsBlog";


import { blogService } from "../../domains/blogs_service";
import { blogsQueryRepository } from "../../repositories/blogs/query_repositories";

import { PaginatorBlogType } from "./types/paginatorBlogType";
import { BlogInputType } from "./types/blogInputType";
import { BlogOutputType } from "./types/blogOutputType";
import { BlogViewType } from "./types/blogViewType";


import { postService } from "../../domains/posts_service";
import { postQueryRepository } from "../../repositories/posts/query_repository";

import { PostInputType } from "../posts/types/postInputType";
import { PostOutputType } from "../posts/types/postOutputType";
import { PaginatorPostType } from "../posts/types/paginatorPostType";
import { UriParamsPost } from "../posts/models/uriParamsPost";


import { basicAuth } from '../../middleware/basic_auth';
import { inputValidation } from '../../middleware/input_validator';
import { nameValid, descriptionValid, websiteUrlValid } from '../../middleware/blogs_validator';
import { titleValid, shortDescriptionValid, contentValid } from '../../middleware/posts_validator';
import { PostViewType } from "../posts/types/postViewType";

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response<PaginatorBlogType>) => {

  const searchNameTerm = req.query.searchNameTerm as string ?? null
  const sortBy = req.query.sortBy as string ?? "createdAt"
  const sortDirection = req.query.sortDirection === 'desc' ? 1 : -1
  const pageNumber = req.query.pageNumber as string ?? '1'
  const pageSize = req.query.pageSize as string ?? '10'

  const blogs: PaginatorBlogType = await blogsQueryRepository.findBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
  res.send(blogs)

})

.get('/:id', async (req: RequestWithParams<UriParamsBlog>, res: Response) => {
  const blog = await blogsQueryRepository.findBlogById(req.params.id)
  if(blog){
    res.send(blog)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
})


.get('/:id/posts', async (req: Request, res: Response<PaginatorPostType>) => {

  const isBlog: BlogViewType | null = await blogsQueryRepository.findBlogById(req.params.id)

  if(!isBlog){
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }

  const sortBy = req.query.sortBy as string ?? "createdAt"
  const sortDirection = req.query.sortDirection === 'desc' ? 1 : -1
  const pageNumber = req.query.pageNumber as string ?? '1'
  const pageSize = req.query.pageSize as string ?? '10'

  const posts: PaginatorPostType = await blogsQueryRepository.findBlogByIdPosts(req.params.id, sortBy, sortDirection, pageNumber, pageSize)
  if(posts){
    console.log(posts)
    res.send(posts)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }

})


.post('/',

    basicAuth, nameValid, descriptionValid, websiteUrlValid, inputValidation,

    async (req: RequestWithBody<BlogInputType>, res: Response<BlogOutputType>) => {

    const {name, description, websiteUrl} = req.body

    const blog: BlogViewType = await blogService.createBlog(name, description, websiteUrl)
    res.status(HTTP_STATUSES.CREATED_201).send(blog)
})


.post('/:id/posts', 

  basicAuth, titleValid, shortDescriptionValid, contentValid, inputValidation,
  
  async (req: RequestWithParamsAndBody<UriParamsPost, PostInputType>, res: Response<PostOutputType>) => {

  const blogId = req.params.id

  const {title, shortDescription, content} = req.body

  const blog: BlogViewType | null = await blogsQueryRepository.findBlogById(blogId)
  if(!blog){
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }

  const newPost: PostViewType = await postService.createPost(title, shortDescription, content, blogId, blog.name)


  res.status(HTTP_STATUSES.CREATED_201).send(newPost)
})


.put('/:id', 

  basicAuth, nameValid, descriptionValid, websiteUrlValid, inputValidation,

  async (req: RequestWithParamsAndBody<UriParamsBlog, BlogInputType>, res: Response<BlogOutputType>) => {

  const {name, description, websiteUrl} = req.body

  const isUpdate = await blogService.updateBlog(req.params.id, name, description, websiteUrl)
  if(isUpdate){
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
})


.delete('/:id', 
  
  basicAuth, 
  
  async (req: RequestWithParams<UriParamsBlog>, res: Response) => {

  const isDeleted = await blogService.deleteBlog(req.params.id)
  
  if(isDeleted){
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
})
