import { Request, Response, Router } from "express";

import { HTTP_STATUSES } from "../../http/statuses";

import { usersService } from "../../domain/users_service";


export const authRouter = Router({})

authRouter.post('/', async (req: Request, res: Response) => {
    const checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    if(checkResult){
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
})