import express, {Request, Response, NextFunction} from 'express'
import { HTTP_STATUSES } from './HTTP/http_statuses';
import { CreateVideoInputModelType } from './models_types/createVideoType'

export const app = express();
const PORT = 3000;

export type VideosType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null | undefined,
    createAt?: string,
    publicationDate?: string,
    availableResolutions: ResolutionsType
}
export type ResolutionsType = Array<string>

const db: {videos: VideosType[] } = {
    videos: [
        {
            id: 1,
            title: 'Мёртвые души',
            author: 'Николай Васильевич Гоголь',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createAt: new Date().toISOString(),
            publicationDate:  new Date().toISOString(),
            availableResolutions: [
                'P144',
            ]
        }, 
        {
            id: 2,
            title: 'Русслан и Людмила',
            author: 'Пушкин Александр Сергеевич',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [
                'P144', 'P240'
            ]
        },
        {
            id:  3,
            title: 'Тихий дон',
            author: 'Шолохов Михаил Александрович',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createAt: new Date().toISOString(), 
            publicationDate: new Date().toISOString(),
            availableResolutions: [
                'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' 
            ]
        }
    ]

    
}

const curDate = new Date();
const day = curDate.getDate() + 1;
const date = curDate.setDate(day);
   

app.get('/', (req: Request, res: Response) => {
    res.send('EXPRESS')
})


app.get('/videos', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(db.videos)
})

app.post('/videos', (req: Request, res: Response) => {
   
    const errors = [];

    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;

    

    if(!title  || typeof title !== 'string' || title.trim() === '' || title.length > 40){
        errors.push({
            "errorsMessages": [
              {
                "message": "error",
                "field": "title"
              }
            ]
          })
    }

    if(!author  || typeof author !== 'string' || author.trim()  === '' || author.length > 20){
        errors.push({
            "errorsMessages": [
              {
                "message": "error",
                "field": "author"
              }
            ]
          })
    }
    
    if(!Array.isArray(availableResolutions) && availableResolutions.length < 1){
        errors.push({
            "errorsMessages": [
              {
                "message": "error",
                "field": "availableResolutions"
              }
            ]
          })
    }

  

    if(errors.length > 0){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errors)
    }
    else {
        const newVideo = {
            id: +(new Date),
            title: title,
            author: author,
            availableResolutions: availableResolutions,
        }
        db.videos.push(newVideo)
        res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
       
    }    
})

app.put('/videos/:id', (req: Request, res: Response) => {
   
    const errors = [];

    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const minAgeRestriction = req.body.minAgeRestriction;
    const publicationDate = req.body.publicationDate;


    

    if(!title  || typeof title !== 'string' || title.trim() === '' || title.length > 40){
        errors.push({
            "errorsMessages": [
              {
                "message": "error",
                "field": "title"
              }
            ]
          })
    }

    if(!author  || typeof author !== 'string' || author.trim()  === '' || author.length > 20){
        errors.push({
            "errorsMessages": [
              {
                "message": "error",
                "field": "author"
              }
            ]
          })
    }
    
    if(!Array.isArray(availableResolutions) && availableResolutions.length < 1){
        errors.push({
            "errorsMessages": [
              {
                "message": "error",
                "field": "availableResolutions"
              }
            ]
          })
    }

    if(typeof canBeDownloaded !== 'boolean'){
        errors.push({
            "errorsMessages": [
              {
                "message": "error",
                "field": "canBeDownloaded"
              }
            ]
          })
    }

    if(typeof minAgeRestriction !== 'number' && (minAgeRestriction < 1 || minAgeRestriction > 18) ){
        errors.push({
            "errorsMessages": [
              {
                "message": "error",
                "field": "minAgeRestriction"
              }
            ]
          })
    }

    if(typeof publicationDate !== 'string' || publicationDate.trim()  === ''){
        errors.push({
            "errorsMessages": [
              {
                "message": "error",
                "field": "publicationDate"
              }
            ]
          })
    }
    


    if(errors.length > 0){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errors)
    }

    const video = db.videos.find(v => v.id === +req.params.id)

    if(!video){
        res.send(HTTP_STATUSES.NOT_FOUND_404)
        return;
    } else {
        video.title = title,
        video.author = author,
        video.availableResolutions = availableResolutions,
        video.canBeDownloaded = canBeDownloaded,
        video.minAgeRestriction = minAgeRestriction,
        video.publicationDate = publicationDate,
        
        res.send(HTTP_STATUSES.NO_CONTENT_204)
       
    }    
})

app.get('/videos/:id', (req: Request, res: Response) => {
    const video = db.videos.find(v => v.id === +req.params.id)
    console.log(video)
    if(!video ){
        res.send(HTTP_STATUSES.NOT_FOUND_404) 
    } else {
        res.status(HTTP_STATUSES.OK_200).send(video)
    }
})

app.delete('/videos/:id', (req: Request, res: Response) => {
    for(let i = 0; i < db.videos.length; i++){
        if(db.videos[i].id === +req.params.id){
            db.videos.splice(i, 1)
            res.send(HTTP_STATUSES.NO_CONTENT_204) 
            return;
        }
    }
    res.status(HTTP_STATUSES.NOT_FOUND_404) 
})

app.delete('/testing/all-data', ( req, res) => {
    db.videos = []; 
    res.send(HTTP_STATUSES.NO_CONTENT_204)  
})

app.listen(PORT, () => {
    console.log("START EXPRESS")
})