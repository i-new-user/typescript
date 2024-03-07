import { Request } from 'express';
import { UserViewType } from './features/users/types/userViewType';


declare module 'express-serve-static-core' {
    namespace Express {
        export interface Request {
            user?: UserViewType | null,
        }
    }
}