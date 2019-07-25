import {
    Response
} from 'express'
import { IStandardResponse } from "../types";
import { logError } from './log';

export function genStandardResponse(data: any, status: number, errored: boolean=false) {
    return {
        // other parts will check for this property and if it's present, assume that response
        // is ready and needs no further modification
        std: true,
        status,
        response: standardResponse(data, errored)
    }
}

export function standardResponse(data: any, errored: boolean=false): IStandardResponse {
    return {
        error_msg: errored ? data : null,
        data: errored ? null : data
    }
}

export function usualErrorHandler(res: Response, err: any) {
    logError(err)

    if (err && err.std) {
        res.status(err.status || 500).json(err.response)
        return
    }
    
    if (process.env.PRODUCTION) {
        const response = standardResponse('Something went wrong', true)
        res.status(500).json(response)
        return
    }

    const response = standardResponse(err, true)
    res.status(500).json(response)
}
