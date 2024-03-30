import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../../http/statuses";


import { userService } from "../../domains/users_service";
import { usersQueryRepository } from "../../repositories/users/query_repository";

import { RequestWithParams } from "../blogs/models/requestWithParams";
import { RequestWithBody } from "../blogs/models/requestWithBody";

import { UriParamsUser } from "./models/uriParamsUser";


import { PaginatorUserType } from './types/paginatorUserType';
import { UserInputType } from "./types/userInputType";
import { UserOutputType } from "./types/userOutputType";


import { basicAuth } from "../../middleware/basic_auth";
import { loginValid } from "../../middleware/users_validator";
import { passwordValid } from "../../middleware/users_validator";
import { emailValid } from "../../middleware/users_validator";
import { inputValidation } from "../../middleware/input_validator";


export const usersRouter = Router({})


usersRouter.get('/',  async (req: Request, res: Response<PaginatorUserType>) => {

    const sortBy = req.query.sortBy as string ?? 'createdAt'
    const sortDirection = req.query.sortDirection === 'desc' ? 1 : -1
    const pageNumber = req.query.pageNumber as string ?? '1'
    const pageSize = req.query.pageSize as string ?? '10'
    const searchLoginTerm = req.query.searchLoginTerm as string ?? null
    const searchEmailTerm = req.query.searchEmailTerm as string ?? null   

    console.log(searchLoginTerm)
    console.log(searchEmailTerm)


    const users: PaginatorUserType = await usersQueryRepository.findUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
    res.send(users)
})

.get('/:id', async (req: Request<UriParamsUser>, res: Response<UserOutputType>) => {

    const user = await usersQueryRepository.findUserById(req.params.id)
    if(user){
        console.log(user)
        res.send(user)
    }else{
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})


.post('/', 

    basicAuth, loginValid, passwordValid, emailValid, inputValidation,
    
    async (req: RequestWithBody<UserInputType>, res: Response<UserOutputType>) => {

    const {login,  password, email} = req.body

    const newUser = await userService.createUser(login, password, email)
    res.status(HTTP_STATUSES.CREATED_201).send(newUser)
})


.delete('/:id', 

    basicAuth,

    async (req: RequestWithParams<UriParamsUser>, res: Response) => {

    const isDeleted = await userService.deleteUser(req.params.id)

 

    if(isDeleted){
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

})

