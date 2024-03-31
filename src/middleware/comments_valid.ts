import { body } from 'express-validator'

export let commentValid = body('content').trim().isString().isLength({min: 20, max:300})
