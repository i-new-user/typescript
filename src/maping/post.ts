
export type mapingPostsType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId:string
    blogName: string
    createdAt: string
}

export type PostOutputType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId:string
    blogName: string
    createdAt: string
}




export const mapingPosts = (post: mapingPostsType): PostOutputType => {
    return {
        id: post.id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt:  post.createdAt
    }
}