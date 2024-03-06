import { body } from "express-validator";

export let titleValid = body('title').isString().trim().isLength({min: 1, max:30})
export let shortDescriptionValid = body('shortDescription').trim().isString().isLength({min: 1, max:100})
export let contentValid = body('content').trim().isString().isLength({min: 1, max:1000})
export let blogIdValid = body('blogId').notEmpty()
