import { body, validationResult } from "express-validator";
import { blogsRepository } from "../repositories/blogs_repositoriy";

export const isBlogCustomValid = body('blogId').custom( (blogId) => {
    const blog = blogsRepository.findBlogById(blogId)
    if(!blog){
        throw Error('Does not blog')
    } else {
        return true;
    }
})