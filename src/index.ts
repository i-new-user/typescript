import express, {Request, Response, NextFunction} from 'express'
import { HTTP_STATUSES } from './HTTP/http_statuses';
import { CreateVideoInputModelType } from './models_types/createVideoType'
import {FieldErrorTupe} from './models_types/errorType'

import bodyParser from 'body-parser';
import cors from 'cors'
import { videosRouter, deleteAllVideosRouter } from './routers/video_router';


export const app = express();
const PORT =  process.env.PORT || 3000;


app.use(bodyParser.json())
app.use(cors())

app.use('/videos', videosRouter)
app.use('/testing/all-data', deleteAllVideosRouter)


app.get('/', (req: Request, res: Response) => {
    res.send('EXPRESS')
})


  
app.listen(PORT, () => {
    console.log("START EXPRESS")
})