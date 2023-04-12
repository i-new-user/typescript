import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../HTTP/http_statuses";
import {FieldErrorTupe} from '../models_types/errorType'
//import { VideosType } from "../models_types/videoType";

export const videosRouter = Router({})
export const deleteAllVideosRouter = Router({})



export type VideosType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null | undefined,
    createdAt?: string,
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
            publicationDate:  new Date( Date.now() + (3600 * 1000 * 24)).toISOString(),
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
            publicationDate: new Date( Date.now() + (3600 * 1000 * 24)).toISOString(),
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
            publicationDate:new Date( Date.now() + (3600 * 1000 * 24)).toISOString(),
            availableResolutions: [
                'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' 
            ]
        }
    ]

    
}


deleteAllVideosRouter.delete('/', ( req: Request, res: Response) => {
    db.videos = []; 
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)  
})


videosRouter.get('/', (req: Request, res: Response<VideosType[]>) => {
    res.send(db.videos)
})

videosRouter.post('/', (req: Request, res: Response) => {
   
    const errors: {errorsMessages: FieldErrorTupe[]} = {errorsMessages: []};

    const title = req.body.title;
    const author = req.body.author;
     const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded || true;
   
    const minAgeRestriction = req.body.minAgeRestriction || null;
    const publicationDate = req.body.publicationDate || new Date().toISOString();

    if(!title  || typeof title !== 'string' || title.trim() === '' || title.length > 40){
        errors.errorsMessages.push(
            {
                "message": "error",
                "field": "title"
            }
        )
    }

    if(!author  || typeof author !== 'string' || author.trim()  === '' || author.length > 20){
        errors.errorsMessages.push(
           
              {
                "message": "error",
                "field": "author"
              }
            
        )
    }
    
    if(!Array.isArray(availableResolutions) || availableResolutions.length < 1){
        errors.errorsMessages.push(
           
              {
                "message": "error",
                "field": "availableResolutions"
              }
            
        )
    }
    for(let elem of availableResolutions){
        if(elem.length > 5){
            errors.errorsMessages.push(
           
                {
                  "message": "error",
                  "field": "availableResolutions"
                }
              
          )
        }
    }

  

    if(errors.errorsMessages.length > 0){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errors)
    }
    else {
        const newVideo: VideosType = {
            id: +(new Date),
            title: title,
            author: author,
            canBeDownloaded: canBeDownloaded,
            availableResolutions: availableResolutions,
            minAgeRestriction: minAgeRestriction,
            publicationDate: publicationDate,
            createdAt: new Date().toISOString()
        }
        console.log(newVideo)
        db.videos.push(newVideo)
        res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
       
    }    
})

videosRouter.put('/:id', (req: Request, res: Response) => {
   
    const errors: {errorsMessages: FieldErrorTupe[]} = {errorsMessages: []};

    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const minAgeRestriction = req.body.minAgeRestriction;
    const publicationDate = req.body.publicationDate;


    

    if(!title  || typeof title !== 'string' || title.trim() === '' || title.length > 40){
        errors.errorsMessages.push(
           
            {
              "message": "error",
              "field": "title"
            }
          
      )
    }

    if(!author  || typeof author !== 'string' || author.trim()  === '' || author.length > 20){
        errors.errorsMessages.push(
           
            {
              "message": "error",
              "field": "author"
            }
          
      )
    }
    
    if(!Array.isArray(availableResolutions) || availableResolutions.length < 1){
        errors.errorsMessages.push(
           
            {
              "message": "error",
              "field": "availableResolutions"
            }
          
      )
    }

    if(typeof canBeDownloaded !== 'boolean'){
        errors.errorsMessages.push(
           
            {
              "message": "error",
              "field": "canBeDownloaded"
            }
          
      )
    }

    if(typeof minAgeRestriction !== 'number' || (minAgeRestriction < 1 || minAgeRestriction > 18) ){
        errors.errorsMessages.push(
           
            {
              "message": "error",
              "field": "minAgeRestriction"
            }
          
      )
    }

    if(typeof publicationDate !== 'string' || publicationDate.trim()  === ''){
        errors.errorsMessages.push(
           
            {
              "message": "error",
              "field": "publicationDate"
            }
          
      )
    }
    


    if(errors.errorsMessages.length > 0){
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

        console.log(video)

        res.send(HTTP_STATUSES.NO_CONTENT_204)
       
    }    
})

videosRouter.get('/:id', (req: Request, res: Response) => {
    const video = db.videos.find(v => v.id === +req.params.id)
    // console.log(video)
    if(!video ){
        res.send(HTTP_STATUSES.NOT_FOUND_404) 
    } else {
        res.status(HTTP_STATUSES.OK_200).send(video)
    }
})

videosRouter.delete('/:id', (req: Request, res: Response) => {
    for(let i = 0; i < db.videos.length; i++){
        if(db.videos[i].id === +req.params.id){
            db.videos.splice(i, 1)
            res.send(HTTP_STATUSES.NO_CONTENT_204) 
            return;
        }
    }
    res.send(HTTP_STATUSES.NOT_FOUND_404) 
})


