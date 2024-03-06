import express, {Request, Response} from 'express'


import { blogsRouter } from './features/blogs/blogs_routers'
import { postsRouter } from './features/posts/posts_routers'
import { usersRouter } from './features/users/users_router'
import { commentsrRouter } from './features/comments/comments_router'
import { authRouter } from './features/auth/auth_router'
import { emailRouter } from './features/email/email_router'
import { testRouter } from './features/testing_routers'


import cors from 'cors'
import bodyParser from 'body-parser'

import jwt from 'jsonwebtoken'

export const app = express()

app.use(cors())
app.use(bodyParser.json())

type RouterPathType = {
    blogs: string
    posts: string
    users: string
    comments: string
   
    auth: string
    email: string
    test: string
}

export const ROUTER_PATH: RouterPathType = {
   blogs: '/blogs',
   posts: '/posts',
   users: '/users',
   comments: '/comments',
 
   auth: '/auth',
   email: '/email',
   test: '/testing/all-data'
}

app.use( ROUTER_PATH.blogs, blogsRouter)
app.use( ROUTER_PATH.posts, postsRouter)
app.use( ROUTER_PATH.users, usersRouter)
app.use( ROUTER_PATH.comments, commentsrRouter)

app.use( ROUTER_PATH.auth, authRouter)
app.use( ROUTER_PATH.email, emailRouter)
app.use( ROUTER_PATH.test, testRouter)



app.get('/', (req: Request, res: Response) => {


    const t1 = jwt.sign({ foo: 'bar' }, 'shhhhh');
    console.log(t1)

    const t2 = jwt.sign(
    {
        data: 'foobar'
    },
    'secret', 
    {
        expiresIn: '1h'
    })

    console.log(t2)

    const decode = jwt.decode(t2, {complete: true})
    console.log(decode!.header)
    console.log(decode?.payload)
    
   

   

    


    res.send('Hello World !!!')
})