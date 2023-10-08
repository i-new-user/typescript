import { Request, Response, Router } from "express";

import { HTTP_STATUSES } from "../../http/statuses";

import { usersService } from "../../domain/users_service";


export const authRouter = Router({})

authRouter.post('/', async (req: Request, res: Response) => {
    const checkResult = await usersService.checkCredentials(req.body.loginOrMail, req.body.passwors)
    if(checkResult){
        res.status(HTTP_STATUSES.CREATED_201)
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
})