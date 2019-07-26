import {
    Request,
    Response,
    NextFunction
} from 'express'
import Answer, { IAnswer, IAnswerQuery } from '../../../models/answer';
import { errorsTrs } from '../../../translations';
import { standardResponse, usualErrorHandler } from '../../../utils';
import { getClient } from '../../../connection-pool';

function validateMultichoiceAnswer(answer: IAnswer, lang: 'fa'|'en'='fa'): string|null {
    try {
        if (answer.answer && answer.answer.choice) {
            if (typeof answer.answer.choice !== 'number') {
                return errorsTrs.expectedNumber[lang]
            }

            return null
        }

        return 'Bad object format'
    } catch (err) {
        return err
    }
}

const validations = {
    multichoice: validateMultichoiceAnswer,
}

async function answer(req: Request, res: Response, next: NextFunction) {
    const body: IAnswerQuery = req.body
    if (!Array.isArray(body.answers)) {
        const response = standardResponse('answers should be object', true)
        res.status(400).json(response)
        return
    }

    for (const answer of body.answers) {
        if (answer.question_type in validations) {
            const validationResult = validations[answer.question_type](answer)
            if (validationResult !== null) {
                const response = standardResponse(validationResult, true)
                res.status(400).json(response)
                return
            }
    
        } else {
            const response = standardResponse('bad question_type', true)
            res.status(400).json(response)
            return
        }
    }

    try {
        const client = await getClient()
        const answer = new Answer(client)
        const dbResponse = await answer.create(body)
        const response = standardResponse(dbResponse)
        res.json(response)

    } catch (err) {
        usualErrorHandler(res, err)
    }   
}

export default answer
