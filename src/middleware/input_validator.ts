import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../http/statuses";
import { validationResult } from "express-validator";

export const inputValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const errorsMessages = errors.array( {onlyFirstError: true}).map((elem: any) => ({
                                                                                   message: elem.msg,
                                                                                   field: elem.path
                                                                                   })
          )

        return res.status(HTTP_STATUSES.BAD_REQUEST_400).json( { errorsMessages }
        )
    }
    return next()
}