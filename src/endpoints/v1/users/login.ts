import {
    Request,
    Response,
    NextFunction
} from 'express'
import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'

import { usualErrorHandler, standardResponse, getPrivateKey } from '../../../utils';
import { getClient } from '../../../connection-pool';
import { User } from '../../../models';
import { errorsTrs } from '../../../translations';

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body
        if (!body.email) {
            const response = standardResponse('Email was not provided', true)
            res.status(400).json(response)
            return
        }

        if (!body.password) {
            const response = standardResponse('Password was not provided', true)
            res.status(400).json(response)
            return
        }

        const client = await getClient()
        const user = new User(client)
        const dbResponse = await user.findOneWithEmail(req.body.email)
        const passwordsMatch = compare(body.password, dbResponse.password)
        if (passwordsMatch) {
            const privateKey = await getPrivateKey()
            const jwtToken = jwt.sign({
                email: dbResponse.email,
            }, privateKey)
            const data = {
                token: jwtToken,
            }
            const response = standardResponse(data)
            res.json(response)
            return

        }

        const response = standardResponse(errorsTrs.passwordsNotMatching['fa'])
        res.status(400).json(response)

    } catch (err) {
        usualErrorHandler(res, err)
    }
}

export default login
