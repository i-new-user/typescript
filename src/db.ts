import { MongoClient } from "mongodb";

import { settings } from "./settings";

import { BlogMongoDBType } from "./features/blogs/types/blogMongoDBType";
import { PostMongoDBType } from "./features/posts/types/postMongoDBType";
import { UserMongoDBType } from "./features/users/types/userMongoDBType";
import { CommentMongoDBType } from "./features/comments/types/commentatorMongoDBType";




const mongoURL = settings.MONGO_URL
console.log(mongoURL)
const client = new MongoClient(mongoURL)
const db = client.db('simple_data')

export const blogsCollection = db.collection<BlogMongoDBType>('blogs')
export const postsCollection = db.collection<PostMongoDBType>('posts')
export const usersCollection = db.collection<UserMongoDBType>('users')
export const commentsCollection = db.collection<CommentMongoDBType>('comments')


export const runDb = async () => {
   try{

    await client.connect()
    console.log(`Connected successfully to server'`)

   } catch(e){
    
    console.log(`Dont connected successfully to server`)
    await client.close()

   }
}


