import express, { Request, Response, NextFunction} from 'express'

import { check, body } from 'express-validator'

import { blogsRouter } from './routers/blogs_routers'
import { postsRouter } from './routers/posts_routers'
import { testingRouter } from './routers/testing_routers'

import cors from 'cors'
import bodyParser from 'body-parser'

export const app = express()
export const port = 3001


app.use( cors() )
app.use( bodyParser.json() )



export const ROUTER_PATH = {
  blogs: '/blogs',
  posts: '/posts',

  test: '/testing/all-data'
}

app.use(ROUTER_PATH.blogs, blogsRouter)
app.use(ROUTER_PATH.posts, postsRouter)
app.use(ROUTER_PATH.test, testingRouter)




app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
