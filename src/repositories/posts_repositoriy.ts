import { blogsRepository } from './blogs_repositoriy';
import { postsCollection } from '../db';

import { PostViewModel } from "../features/posts/models/view_model";
import { PostInputModel } from "../features/posts/models/input_model";
import { PostModel } from '../features/posts/models/post_model';
import { PostMongoDBModel } from '../features/posts/models/post_mongoDb_model';
import { ObjectId } from 'mongodb';


let posts: PostModel[] = [
    { 
        id: '1', title:	'Французские галеты с абрикосами', 
        shortDescription:	'По-настоящему летний рецепт! Сочетание хрустящего теста и сочных кисло-сладких абрикосов никого не оставит равнодушным - особенно если подать этот пирог с пломбиром и кофе...', 
        content:      `Сливочное масло за 15 минут убираем в морозильную камеру. Муку смешиваем с сахарной пудрой, содой и солью.
                       Охлаждённое масло окунаем в муку и натираем на крупной тёрке. Натёртое масло сразу же смешиваем с мукой. Немного перетираем полученную массу руками. В результате должна получится крупная неоднородная крошка. Добавляем туда сметану и перемешиваем.
                       Тесто собираем в комок, не вымешиваем. Тесто получится неоднородное и мягкое, к рукам липнуть не должно. Делим его на 2 равные части. 
                       Заматываем комочки теста в плёнку и убираем в холодильник минимум на 1 час. Также можно оставить на ночь.`,
        blogId:	'1',
        blogName:'Тома',
        createdAt: String(new Date())
    },

    { 
        id: '2', title:	'Печенье с арахисовым маслом', 
        shortDescription:	'Наконец мой ребенок распробовал вкус домашнего печенья. Наконец я могу отвести душу и печь ему всякие вкусности. Печенье с арахисовым масло было для нас всех экспериментальным. Есть в блоге похожее печенье с арахисом.', 
        content:      `1.. Сливочное масло комнатной температура соединить с сахаром, коричневым сахаром, ванильным сахаром и яйцом. Взбить миксером на высокой скорости. Смесь должны посветлеть и стать воздушной, на это уходит примерно 3-5 минут.
                       2. Затем добавить арахисовое масло и перемешать еще раз на высокой скорости до однородности.
                       3. В отдельной миске просеять муку, соду, разрыхлитель и соль. Перемешать. Постепенно ввести сухую смесь в жидкие ингредиенты. Перемешать. Должна получится мягкая масса не много липнущая к рукам. Я все перемешала ложкой и так же ложкой выложила массу на пленку. Сформировала, ложкой же, шар и завернула его в пленку.
                       4. Убираем тесто в холодильник минимум на 3 часа. У меня тесто пролежало в холодильнике 5 часов.
                       5. Разогреваем духовку до 180С. Противень застилаем пергаментом.
                       6. Из теста формируем 16 шариков весом 44 гр. Выкладываем их на противень, на расстоянии 4 см., приминаем руками формируя «шайбочки». Для красоты можно сделать сверху сеточку при помощи вилки. Или выложить сверху орешки.
                       7. Выпекаем печенья 13 минут, нагрев верх/низ без конвекции. Печенье должно слегка подрумяниться по краям, но остаться светлым.
        
                       Готовые печенья вынуть из духовки, оставить на протвине на 5 минут, затем переложить на решетку и дать полностью остыть.
                       Приятного чаепития. `,
        blogId:	'2',
        blogName:'Клава',
        createdAt: String(new Date())
    },

    { 
        id: '3', title:	'5 рецептов летней пасты', 
        shortDescription:	'Паста - это то, что всегда есть у меня дома! И не просто потому, что блюда из пасты быстрые, простые и, как правило, очень вкусные, но и за большое разнообразие блюд, которые можно с ней приготовить!', 
        content:      `Паста с томатами
        Ингредиенты
        
        Паста 200 гр
        Помидоры 200-300 гр
        Чеснок 1-2 зубчика
        Сыр твердый 30-50 гр
        Оливковое масло 30 гр
        Базилик 2-3 листа
        Соль
        Перец
        Сахар
        
        Рецепт Чеснок чуть обжаритьДобавить к нему томаты.
        Прогреть все вместе 3-4 минуты и смешать с томатной пастой.
        Сверху посыпать базиликом и тертым сыром.
        Готово`,
        blogId:	'3',
        blogName:'Тося',
        createdAt: String(new Date())
    },
]

export const postsRepository = {

    async findPosts(): Promise<PostViewModel[]>{
        const posts: PostMongoDBModel[] = await postsCollection.find({}).toArray()
        return posts.map( post => (
            {
                id: String(post._id),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            }
        ))
    },

    async findPostById(id: string): Promise<PostViewModel | undefined | null>{
       const post: PostMongoDBModel | null = await postsCollection.findOne({_id: new ObjectId(id)})
       if(post){
        return {
            id: String(post._id) ,
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



    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostViewModel>{
        const blog = await blogsRepository.findBlogById(blogId)
      
        const newPost: PostMongoDBModel = {
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog!.name,
            createdAt:  new Date().toISOString(),
          }

        const result = await postsCollection.insertOne(newPost)

        return   {
            id: String(result.insertedId),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: blog!.name,
            createdAt:  newPost.createdAt
          }
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean>{

        const result = await postsCollection.updateOne({_id: new Object(id)}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
        return result.matchedCount === 1
    },

    async deletePost(id: string): Promise<boolean>{
       const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
       return result.deletedCount === 1
    },

    async deleteAllPost(){
        return await postsCollection.deleteMany({})
    }
}