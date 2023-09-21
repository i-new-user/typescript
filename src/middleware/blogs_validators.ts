import { body } from "express-validator"

export let nameValid = body('name').isString().trim().isLength({min: 1, max:15})
export let descriptionValid = body('description').trim().isString().isLength({min: 1, max:500})
export let websiteUrlValid = body('websiteUrl').trim().isString().isLength({min: 1, max:100}).matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
 