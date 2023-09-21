import { body } from "express-validator";
import { blogsQueryRepository } from "../repositories/blogs/query_repositories";

export const isBlogCustomValid = body('blogId').custom( async (blogId) => {
    const blog = await blogsQueryRepository.findBlogById(blogId)
    if(!blog){
        throw Error('Does not blog')
    } else {
        return true;
    }
})