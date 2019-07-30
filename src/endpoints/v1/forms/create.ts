import {
    Request,
    Response,
    NextFunction
} from 'express'
import { PoolClient } from 'pg';

import { getClient } from '../../../connection-pool';
import { IQuestionBody, IQuestion } from '../../../types';
import {
    Multichoice,
    Simpletext,
    Yesorno,
} from '../../../models/questions'
import { IQuestionCreator } from '../../../types/models';
import { errorsTrs } from '../../../translations';
import { genStandardResponse } from '../../../utils';
import { IGeneratedStandardResponse, standardResponse, usualErrorHandler } from '../../../utils/http';
import { Form } from '../../../models';
import { IForm } from '../../../models/form';

interface IExpectedRequestBody {
    form_name: string
    questions: IQuestionBody[]
}

function initiateQuestionInstances(client: PoolClient): { [key: string]: IQuestionCreator } {
    return {
        multichoice: new Multichoice(client),
        simpletext: new Simpletext(client),
        yesorno: new Yesorno(client),
    }
}

function validateRequestBody(reqBody: IExpectedRequestBody, lang: 'fa'|'en'='fa'): IGeneratedStandardResponse|null {
    if (!reqBody.form_name) {
        return genStandardResponse(errorsTrs.formNameNotProvided[lang], 400, true)
    }

    if (!Array.isArray(reqBody.questions)) {
        return genStandardResponse('Questions are not array', 400, true)
    }

    return null
}

async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const body: IExpectedRequestBody = req.body
        const validationResult = validateRequestBody(body)
        if (validationResult !== null) {
            res.status(validationResult.status).json(validationResult.response)
            return
        }

        const client = await getClient()
        const form = new Form(client)
        const questionCreators = initiateQuestionInstances(client)
        const questions: IQuestion[] = [];
        for (const { question_type, body: question_body } of body.questions) {
            const { id: qid } = await questionCreators[question_type].create(question_body)
            questions.push({
                question_type,
                qid,
            })
        }

        const formData: IForm = {
            form_name: body.form_name,
            owner: 1,
            questions,
        }
        const dbResponse = await form.create(formData)
        const response = standardResponse(dbResponse)

        res.json(response)

    } catch (err) {
        usualErrorHandler(res, err)
    }
}

export default create
