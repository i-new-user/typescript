import { Request, Response, Router } from "express";

import { HTTP_STATUSES } from "../../http/statuses";

import { usersService } from "../../domain/users_service";

import { PaginatorUserModel } from "./models/entity/userPaginator";
import { usersQueryRepository } from "../../repositories/users/query_repositories";
import { UserViewModel } from "./models/entity/userViewModel";

import { ReqBody } from "./models/req_res/req_body";

import { basicAuth } from "../../middleware/basic_auth";
import { loginValid, passwordValid, emailValid } from "../../middleware/users_validators";
import { inputValidation } from "../../middleware/input_validator";
import { UserInputModel } from "./models/entity/userInputModel";

import { ReqParams } from "../blogs/models/req_res/req_params";
import { GetById } from "./models/req_res/get_by_id";




export const usersRouter = Router({})

usersRouter.get('/',  async (req: Request, res: Response<PaginatorUserModel>) => {
    const sortBy = req.query.sortBy as string ?? "createdAt"
    const sortDirection = req.query.sortDirection === "asc" ? 1 : -1
    const pageNumber = req.query.pageNumber as string ?? '1'
    const pageSize = req.query.pageSize as string ?? '10'
    const searchLoginTerm = req.query.searchLoginTerm as string ?? null
    const searchEmailTerm = req.query.searchEmailTerm as string ?? null

    let foundEntityes: PaginatorUserModel = await usersQueryRepository.findUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
    res.send(foundEntityes)
})


.post('/', 
        
    basicAuth, loginValid, passwordValid, emailValid, inputValidation,

    async (req: ReqBody<UserInputModel>, res: Response<UserViewModel>) => {

    const {login, email, password}  = req.body
    
    let newUser = await usersService.createUser(login, email, password)
    res.status(HTTP_STATUSES.CREATED_201).send(newUser)
})


.delete('/:id', 
        basicAuth,

        async (req: ReqParams<GetById>, res: Response) => {

        let isDeleted = await usersService.deleteUser(req.params.id)  
        
        if(isDeleted){
            res.send(HTTP_STATUSES.NO_CONTENT_204)
        } else {
          res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
      
})