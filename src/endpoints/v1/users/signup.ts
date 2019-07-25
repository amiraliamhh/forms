import {
    Request,
    Response,
    NextFunction
} from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../../../models';
import { getClient } from '../../../connection-pool';
import { getPrivateKey, standardResponse, usualErrorHandler } from '../../../utils';

async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const client = await getClient()
        const user = new User(client)
        const dbResponse = await user.create(req.body)
        const savedUser = dbResponse.rows[0]
        const privateKey = await getPrivateKey()
        const jwtToken = await jwt.sign({
            email: savedUser.email
        }, privateKey)
        const data = {
            token: jwtToken
        }
        const response = standardResponse(data)
        res.json(response)

    } catch (err) {
        usualErrorHandler(res, err)
    }
}

export default signup
