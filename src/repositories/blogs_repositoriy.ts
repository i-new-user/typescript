import { blogsCollection } from './../db';
import { BlogViewModel } from './../features/blogs/models/view_model';
import { BlogInputModel } from '../features/blogs/models/input_model';
import { BlogModel } from '../features/blogs/models/blog_model';
import { BlogMongoDBModel } from '../features/blogs/models/blog_mongoDB_model';
import { ObjectId } from 'mongodb';



let __blogs: BlogModel[] = [
    {id: '1', name: 'Тома', description: 'Интересные рецепты, тонкости приготовления разнообразных блюд и самые неожиданные кулинарные решения! Читайте наш блог.', websiteUrl: 'https://cookhouse.ru/blog/', createdAt: String(new Date()), isMembership: false},
    {id: '2', name: 'Клава', description: 'Простые и вкусные рецепты, авторские рецепты с фото, а также лучшие проверенные рецепты.', websiteUrl: 'https://kulinarniiblog.com/', createdAt: String(new Date()), isMembership: false},
    {id: '3', name: 'Тося', description: 'Кулинарный блог онлайн-школы ЩиБорщи ', websiteUrl: 'https://www.schiborschi.online/blog/', createdAt: String(new Date()), isMembership: false},
]



export const blogsRepository = {

    async findBlogs(): Promise<BlogViewModel[]>{
        const blogs: BlogMongoDBModel[] = await blogsCollection.find({}).toArray()
        return blogs.map( blog => (
            {
                id:  String(blog._id),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership
            }
        ))
    },

    async findBlogById(id: string): Promise<BlogViewModel | undefined | null>{
        const blog = await blogsCollection.findOne({_id: new ObjectId(id)})
        if(blog){
            return {
                id: String(blog._id),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: blog.isMembership
            }
        } else {
            return null
        }
    },

    async createBlog( name: string, description: string, websiteUrl: string): Promise<BlogViewModel>{

        
        const newBlog: BlogMongoDBModel = {
            _id: new ObjectId(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt:new Date().toISOString(),
            isMembership: false
          }

          const result = await blogsCollection.insertOne(newBlog)

          
          return   {
            id: String(result.insertedId),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
          }
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{

        const result = await blogsCollection.updateOne({_id: new ObjectId(id)}, {$set: {name: name, description: description, websiteUrl: websiteUrl }})
        return result.matchedCount === 1

    },

    async deleteBlog(id: string): Promise<boolean>{
        
        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteAllBlogs(){
        return await blogsCollection.deleteMany({})
    }

}