import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/blogs/command_repositories";
import { postsRepository } from '../repositories/posts/command_repositories';
import { HTTP_STATUSES } from "../http/statuses";
import { usersCollection } from "../db";


export const testingRouter = Router({})

testingRouter.delete('/', async (req: Request, res: Response) => {
    await blogsRepository.deleteAllBlogs()
    await postsRepository.deleteAllPost()
    await usersCollection.deleteMany()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})