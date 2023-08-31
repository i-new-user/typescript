import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/blogs_repositoriy";
import { postsRepository } from '../repositories/posts_repositoriy';
import { HTTP_STATUSES } from "../http/statuses";


export const testingRouter = Router({})

testingRouter.delete('/', (req: Request, res: Response) => {
    blogsRepository.deleteAllBlogs()
    postsRepository.deleteAllPost()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})