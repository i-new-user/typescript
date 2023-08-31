import express, { Request, Response, NextFunction} from 'express'

import { check, body } from 'express-validator'

import { blogsRouter } from './features/blogs/blogs_routers'
import { postsRouter } from './features/posts/posts_routers'
import { testingRouter } from './features/testing_routers'

import cors from 'cors'
import bodyParser from 'body-parser'

export const app = express()
export const port = 3000


app.use( cors() )
app.use( bodyParser.json() )

export type RouterPathType = {
  blogs: string
  posts: string
  test: string
}

export const ROUTER_PATH: RouterPathType = {
  blogs: '/blogs',
  posts: '/posts',

  test: '/testing/all-data'
}

app.use(ROUTER_PATH.blogs, blogsRouter)
app.use(ROUTER_PATH.posts, postsRouter)
app.use(ROUTER_PATH.test, testingRouter)




app.get('/', (req: Request, res: Response) => {
  console.log(ROUTER_PATH.test)
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
