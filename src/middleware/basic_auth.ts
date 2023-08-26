import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUSES } from '../http/statuses';

export const basicAuth = (req: Request, res: Response, next: NextFunction ) => {
    let base = req.headers.authorization?.split(' ')[0]
    let data = req.headers.authorization?.split(' ')[1]
    if( (base !== 'Basic') || (data !== 'YWRtaW46cXdlcnR5') ){
        res.status(HTTP_STATUSES.UNAUTHORIZED_401).end()
        return
    } 
    if( (base === 'Basic') || (data === 'YWRtaW46cXdlcnR5')  ){
        next()
    }
}