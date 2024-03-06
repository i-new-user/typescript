import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../../http/statuses";


import { jwtService } from "../../application/jwtService";
import { authService } from "../../domains/auth_service";

import { basicAuth } from "../../middleware/basic_auth";
import { LoginOrEmailValid } from "../../middleware/passOrLog_valid";
import { passwordValid } from "../../middleware/users_validator";

import { authMiddleware } from "../../middleware/authMiddleware";



export const authRouter = Router({})

authRouter.get('/me', 

    authMiddleware,

    async (req: Request, res: Response) => {

    const user = req.user

    if(user){

        const currentUser = {
            email: user.email,
            login: user.login,
            userId: String(user.id)
        }

        res.send(currentUser)

    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
})

authRouter.post('/login', 

     basicAuth, LoginOrEmailValid, passwordValid,
    
    async (req: Request, res: Response) => {

    const {loginOrEmail, password} = req.body

    const user = await authService.checkCredentials(loginOrEmail, password)
    if(user){
        const token = await jwtService.createJWT(user)
        res.status(HTTP_STATUSES.OK_200).send( { accessToken: token})
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
})