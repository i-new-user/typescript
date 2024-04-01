import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../http/statuses";
import { commentsQueryRepository } from "../repositories/comments/query_repository";

export const checkedCommentBellongsToUser = async (req: Request, res: Response, next: NextFunction) => {
   
    const commentUserId = req.user?.id
  
    const comment = await commentsQueryRepository.findCommentById(req.params.id)
  
    if(!comment){
      
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
   
    if(commentUserId !==  comment?.commentatorInfo.userId){
        res.sendStatus(HTTP_STATUSES.FORBIDDEN_403)
        return
    }

    next()
}