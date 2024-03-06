import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../http/statuses";
import { blogsCollection } from "../db";


import { blogRepository } from "../repositories/blogs/command_repositories";
import { postRepository } from "../repositories/posts/command_repository";
import { usersRepository } from "../repositories/users/command_repository";
import { commentsRepository } from "../repositories/comments/command_repository";


import { basicAuth } from "../middleware/basic_auth";


export const testRouter = Router({})

testRouter.delete('/', 

    basicAuth,
 
    async (req: Request, res: Response) => {

    await blogRepository.deleteAllBlogs()
    await postRepository.deleteAllPosts()
    await usersRepository.deleteAllUsers()
    await commentsRepository.deleteAllComments()
    await res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})