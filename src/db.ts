import { BlogMongoDBModel } from './features/blogs/models/blog_mongoDB_model'
import { PostMongoDBModel } from './features/posts/models/post_mongoDb_model'
import { MongoClient, ObjectId } from 'mongodb'

import dotenv from 'dotenv'

dotenv.config()




const mongoURI = process.env.MONGO_URL || 'nongodb://0.0.0.0:27017'

const client = new MongoClient(mongoURI)
const db = client.db('learning')

export const blogsCollection = db.collection<BlogMongoDBModel>('blogs')
export const postsCollection = db.collection<PostMongoDBModel>('posts')


export const runDb = async () => {
    try{
        // console.log(process.env.MONGO_URL)
        await client.connect()
        console.log('Connected successfully to server')

    } catch(e) {

        console.log('Dont connected successfully to server')
        await client.close()

    }
}

