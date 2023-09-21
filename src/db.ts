import { BlogMongoDBModel } from './features/blogs/models/entity/blogMongoDBModel'
import { PostMongoDBModel } from './features/posts/models/entity/postMongoDBModel'

//Эта строка импортирует классы MongoClient и ObjectId
import { MongoClient, ObjectId } from 'mongodb'

//Эта строка импортирует модуль dotenv
import dotenv from 'dotenv'

//Эта строка вызывает функцию config() из модуля dotenv, 
//чтобы загрузить переменные среды из файла .env в процесс.
dotenv.config()



//Эта строка создает переменную mongoURI, которая содержит URL-адрес MongoDB, 
//полученный из переменной среды MONGO_URL. Если значение переменной среды MONGO_URL 
//не определено, будет использовано значение 'nongodb://0.0.0.0:27017'
const mongoURI = process.env.MONGO_URL || 'nongodb://0.0.0.0:27017'

//Эта строка создает новый экземпляр класса MongoClient с использованием mongoURI 
//в качестве аргумента конструктора. MongoClient используется для подключения 
//к серверу MongoDB.
const client = new MongoClient(mongoURI)

//Эта строка создает переменную db, которая содержит базу данных MongoDB с именем 
//'learning'. Эта база данных будет использоваться для выполнения операций с 
//коллекциями.
const db = client.db('learning')

// Эта строкb создают константы postsCollection и , которe представляют коллекции 
//MongoDB с именем 'posts'. Тип коллекции указывается как PostMongoDBModel, что
// может быть определено в модели.
export const blogsCollection = db.collection<BlogMongoDBModel>('blogs')
export const postsCollection = db.collection<PostMongoDBModel>('posts')

//Эта строка экспортирует асинхронную функцию runDb, которая содержит 
//основную логику для подключения к серверу MongoDB.
export const runDb = async () => {
    try{
        // console.log(process.env.MONGO_URL)

        //Эта строка асинхронно подключается к серверу MongoDB 
        //с использованием созданного клиента client
        await client.connect()
        console.log('Connected successfully to server')

    } catch(e) {

        console.log('Dont connected successfully to server')

        // Эта строка асинхронно закрывает соединение с сервером MongoDB
        await client.close()

    }
}

