import { body, validationResult } from 'express-validator';

import { Request, Response, Router } from "express";
import { ROUTER_PATH, RouterPathType } from '../../app';

import { HTTP_STATUSES } from "../../http/statuses";

import { BlogViewModel } from "./models/view_model";
import { BlogInputModel } from './models/input_model';
import { BlogModel } from './models/blog_model';


import { ReqBody } from "./models/req_body";
import { ReqParams } from "./models/req_params";
import { ReqParamsAndBody } from "./models/req_params_and_body";
import { ReqQuery } from "./models/req_query";
import { GetById } from "./models/get_by_id";

import { blogsRepository } from "../../repositories/blogs_repositoriy";

import { basicAuth } from "../../middleware/basic_auth";
import { inputValidation } from '../../middleware/input_validator';




export const blogsRouter = Router({})

let nameValid = body('name').isString().trim().isLength({min: 1, max:15})
let descriptionValid = body('description').trim().isString().isLength({min: 1, max:500})
let websiteUrlValid = body('websiteUrl').trim().isString().isLength({min: 1, max:100}).matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
 
                                                                                                  



blogsRouter.get('/', async ( req: ReqParams<BlogViewModel>, res: Response<BlogViewModel[]>)  => {

    let foundEntityes: BlogModel[] = await blogsRepository.findBlogs()
    res.send(foundEntityes)
})


.get('/:id', async ( req: ReqParams<GetById >, res: Response<BlogViewModel>)  => {

  let foundEntity: BlogModel | null | undefined = await blogsRepository.findBlogById(req.params.id)
 
  if(foundEntity){
    res.send(foundEntity)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
})



.delete('/:id', 

  basicAuth,

  async (req: ReqParams<GetById>, res: Response)  => {

  let isDeleted = await blogsRepository.deleteBlog(req.params.id)

  if(isDeleted){
    res.send(HTTP_STATUSES.NO_CONTENT_204)
  } else {
    res.send(HTTP_STATUSES.NOT_FOUND_404)
  }
})


.post('/',

    basicAuth, nameValid, descriptionValid, websiteUrlValid, inputValidation,

    async (req: ReqBody<BlogInputModel>, res: Response<BlogViewModel>)  => {

    let {name, description, websiteUrl} = req.body

    let newBlog = await blogsRepository.createBlog( name, description, websiteUrl)
    res.status(HTTP_STATUSES.CREATED_201).send(newBlog)
})


.put('/:id',

  basicAuth, nameValid, descriptionValid, websiteUrlValid, inputValidation,

  async ( req: ReqParamsAndBody<GetById, BlogInputModel>, res: Response<BlogViewModel>)  => {

  let isUpdate = await blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
  
  if(isUpdate){
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }

})  



.delete('/testing/all-data',

  basicAuth, 

  async (req: Request, res: Response) => {
    await res.send(HTTP_STATUSES.NO_CONTENT_204)
})
