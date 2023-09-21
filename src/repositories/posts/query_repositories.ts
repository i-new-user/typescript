import { ObjectId, WithId } from 'mongodb';
import { PostOutputType } from '../../maping/post';
import { postsCollection } from '../../db';
import { PostMongoDBModel } from '../../features/posts/models/entity/postMongoDBModel';


export type PostOutputModel = {
    id: string
    title:	string
    shortDescription:	string
    content:	string
    blogId:	string
    blogName:	string
    createdAt: string
}

export const postQueryRepository = {

    async findPosts(): Promise<PostOutputModel[]> {

        const posts: WithId<PostMongoDBModel>[] | []= await postsCollection.find({}).toArray()

        return posts.map( post => {
            return {
                id: String(post._id),
                title:	post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId:	post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt           
            }
        })

    },

    async findPostById(id: string): Promise<PostOutputModel | null | undefined> {

        const post: WithId<PostMongoDBModel> | null = await postsCollection.findOne({_id: new ObjectId(id)})

        if(post){
         return {
             id: String(post._id),
             title: post.title,
             shortDescription: post.shortDescription,
             content: post.content,
             blogId: post.blogId,
             blogName: post.blogName,
             createdAt: post.createdAt
         }
        } else {
         return null
        }
    }, 

}