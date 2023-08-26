import { Request } from "express";

export type ReqQuery<T> = Request<{}, {}, {}, T>