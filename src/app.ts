import express, { Request, Response} from "express"

import bodyParser from "body-parser"
import cors from "cors"

import { blogsRouter } from "./features/blogs/blogs_routers"
import { postsRouter } from "./features/posts/posts_routers"
import { usersRouter } from "./features/users/users_router"
import { authRouter } from "./features/auth/auth_router"
import { testingRouter } from "./features/testing_routers"


export const app = express()

app.use( cors() )
app.use( bodyParser.json() )

export type RouterPathType = {
  blogs: string
  posts: string
  users: string
  login: string
  test: string
}

export const ROUTER_PATH: RouterPathType = {
  blogs: '/blogs',
  posts: '/posts',
  users: '/users',
  login: '/auth/login',
  test:  '/testing/all-data'
}

app.use(ROUTER_PATH.blogs, blogsRouter)
app.use(ROUTER_PATH.posts, postsRouter)
app.use(ROUTER_PATH.users, usersRouter)
app.use(ROUTER_PATH.login, authRouter)
app.use(ROUTER_PATH.test, testingRouter)



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

