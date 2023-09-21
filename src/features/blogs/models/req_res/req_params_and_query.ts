import { Request } from "express";

export type ReqParamsAndQuery<T, B> = Request<T, {}, {}, B>