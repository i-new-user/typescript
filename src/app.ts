import bodyParser from "body-parser"
import cors from "cors"
import express, { Request, Response} from "express"
import { blogsRouter } from "./features/blogs/blogs_routers"
import { postsRouter } from "./features/posts/posts_routers"
import { testingRouter } from "./features/testing_routers"


export const app = express()

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




// type objType = {
//   [key: string]: {id: number, name: string}
// }

// let obj: objType = {
//   '1': {id: 1, name: 'Tom'}, 
//   '100':  {id: 2, name: 'Ket'}, 
//   '1000':  {id: 3, name: 'Kruz'},
//   '5000':  {id: 4, name: 'Sem'}
// }

// let arr = [
//   {id: 1, name: 'Tom'}, 
//   {id: 2, name: 'Ket'}, 
//   {id: 3, name: 'Kruz'},
//   {id: 4, name: 'Sem'}
// ]

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

