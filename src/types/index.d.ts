import { Request } from 'express';
import { UserViewType } from '../features/users/types/userViewType';

declare global {
    namespace Express {
        export interface Request {
            user?: UserViewType | null,
        }
    }
}