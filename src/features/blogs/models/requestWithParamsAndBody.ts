import { Request } from "express"

export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>