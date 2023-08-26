import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../http/statuses";
import { validationResult } from "express-validator";

export const inputValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(HTTP_STATUSES.BAD_REQUEST_400).json( { errorsMessages: 
                                                                    errors.array( {onlyFirstError: false})
                                                               }
        )
    }
    return next()
}