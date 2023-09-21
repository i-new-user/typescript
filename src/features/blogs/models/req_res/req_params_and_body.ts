import { Request } from "express";

export type ReqParamsAndBody<T, B> = Request<T, {}, B>


