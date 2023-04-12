import express, {Request, Response, NextFunction} from 'express'
import { HTTP_STATUSES } from './HTTP/http_statuses';
import { CreateVideoInputModelType } from './models_types/createVideoType'
import {FieldErrorTupe} from './models_types/errorType'

import bodyParser from 'body-parser';
import cors from 'cors'
import { videosRouter } from './routers/video_router';


export const app = express();
const PORT =  process.env.PORT || 3000;


app.use(bodyParser.json())
app.use(cors())

app.use('/videos', videosRouter)


let currentDate = new Date().toISOString();
let publicPlusOneDey = new Date( Date.now() + (3600 * 1000 * 24)).toISOString();







  
app.listen(PORT, () => {
    console.log("START EXPRESS")
})