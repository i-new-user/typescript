import { UserViewType } from './../features/users/types/userViewType';
import { Request } from 'express';

export interface RequestCustomForAuthMiddleware extends Request{
    user?: UserViewType | null,
}