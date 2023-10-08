import { body } from "express-validator";

export const loginValid = body('login').isString().trim().isLength({min: 3, max:10}).matches('^[a-zA-Z0-9_-]*$')
export const passwordValid = body('password').isString().trim().isLength({min: 6, max:20})
export const emailValid = body('email').isString().trim().isLength({min: 1, max:30}).matches('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')

