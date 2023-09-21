import { BlogModel } from "./features/blogs/models/entity/blogModel"

export const sorting = (blogs: BlogModel[]) => {
    return [...blogs].sort( (blog_one, blog_two) => {
        if(blog_one.name < blog_two.name) return -1
        if(blog_one.name > blog_two.name) return 1
        return 0
    })
}