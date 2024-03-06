import {body} from 'express-validator'

export let LoginOrEmailValid = body('loginOrEmail').trim().isString()
export let passwordValid = body('pssword').trim().isString()