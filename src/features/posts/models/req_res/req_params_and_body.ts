import { Request } from "express";

export type ReqParamsAndBodyPost<T, B> = Request<T, {}, B>