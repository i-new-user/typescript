import { body } from 'express-validator'

export let conmmentValid = body('content').trim().isString().isLength({min: 20, max:300})
