import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../../http/statuses";


import { commentsQueryRepository } from "../../repositories/comments/query_repository";
import { commentsRepository } from "../../repositories/comments/command_repository";


import { RequestWithParamsAndBody } from "../blogs/models/requestWithParamsAndBody";
import { RequestWithParams } from "../blogs/models/requestWithParams";
import { UriParamsComments } from "./models/uriParamsComments";


import { CommentInputType } from "./types/commentInputType";
import { CommentOutputType } from "./types/commentatorOutputType";
import { CommentViewType } from "./types/commentatorViewType";
import { commentValid } from "../../middleware/comments_valid";


import { authMiddleware } from "../../middleware/authMiddleware";
import { commentsService } from "../../domains/coments_service";


import { inputValidation } from "../../middleware/input_validator";
import { checkedCommentBellongsToUser } from '../../middleware/checkingCommentBelongsToUser';

export const commentsrRouter = Router({})


commentsrRouter.get('/:id', async (req: RequestWithParams<UriParamsComments>, res: Response<CommentOutputType>) => {
    const comment = await commentsQueryRepository.findCommentById(req.params.id)
    if(comment){
        res.send(comment)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})


.put('/:id', 

    authMiddleware, commentValid, inputValidation, checkedCommentBellongsToUser,
     
    async (req: RequestWithParamsAndBody<UriParamsComments, CommentInputType>, res: Response<CommentOutputType>) => {
        
    console.log( req.headers.authorization)
    const id = req.params.id

    const {content} = req.body

    const isUpdate = await commentsService.updateComment(id, content)
    console.log(7)
    if(isUpdate){
        console.log()
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        console.log(9)
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})

.delete('/:id', 

    authMiddleware, checkedCommentBellongsToUser,
     
    async (req: RequestWithParams<UriParamsComments>, res: Response) => {

    const isDeleted = await commentsRepository.deleteComment(req.params.id)
    if(isDeleted){
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})