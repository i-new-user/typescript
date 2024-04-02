import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../http/statuses";
import { commentsQueryRepository } from "../repositories/comments/query_repository";

export const checkedCommentBellongsToUser = async (req: Request, res: Response, next: NextFunction) => {
   
    const commentUserId = req.user?.id
    console.log(1)

    const comment = await commentsQueryRepository.findCommentById(req.params.id)
    console.log(2)
    console.log(comment)

    if(!comment){
        console.log(3)
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    console.log(4)

    if(commentUserId !==  comment?.commentatorInfo.userId){
        console.log(5)

        res.sendStatus(HTTP_STATUSES.FORBIDDEN_403)
        return
    }
    
    console.log(6)
    next()
}