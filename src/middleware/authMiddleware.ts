import { Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../http/statuses";

import { jwtService } from "../application/jwtService";

import { usersQueryRepository } from "../repositories/users/query_repository";

import { RequestCustomForAuthMiddleware } from './../types/reqCustForAuthMiddleware';


export const authMiddleware = async (req: RequestCustomForAuthMiddleware, res: Response, next: NextFunction) => {
    console.log(req.headers.authorization)
    if(!req.headers.authorization){
       
        res.send(HTTP_STATUSES.UNAUTHORIZED_401)
        return
    }

    const token = req.headers.authorization?.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token)

    // console.log(userId)
    if(userId){
       
        

        req.user = await usersQueryRepository.findUserById(userId)
        next()
    } else {
        res.send(HTTP_STATUSES.FORBIDDEN_403)
    }
    
}