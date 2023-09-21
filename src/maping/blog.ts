
type mapingBlogType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt:string
    isMembership: string
}

type BlogOutputType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt:string
    isMembership: string
}


const mapingBlogs = (blog: mapingBlogType): BlogOutputType => {
    return {
        id:  blog.id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership        
    }
}