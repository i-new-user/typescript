import { body } from 'express-validator'

export let contentValid = body('content').trim().isString().isLength({min: 20, max:300})
