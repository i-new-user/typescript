import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../../http/statuses";

import { emailAdapter } from "../../adapters/email-adapter";

export const emailRouter = Router({})


emailRouter.post('/send', async (req: Request, res: Response) => {
    const {email, subject, message} = req.body
    const letter = await emailAdapter.sendEmail(email, subject, message)
    res.sendStatus(HTTP_STATUSES.CREATED_201)
})

