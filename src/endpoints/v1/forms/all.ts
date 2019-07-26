import {
    Request,
    Response,
    NextFunction
} from 'express'
import { getClient } from '../../../connection-pool';
import { Form } from '../../../models';
import { usualErrorHandler, standardResponse } from '../../../utils';

async function all(req: Request, res: Response, next: NextFunction) {
    try {
        const client = await getClient()
        const form = new Form(client)
        const dbResponse = await form.getAll()
        const response = standardResponse(dbResponse)
        res.json(response)

    } catch (err) {
        usualErrorHandler(res, err)
    }

}

export default all
