import { PoolClient } from "pg";
import { logError } from "../utils";
import { IMultichoiceExpectedAnswerFormat } from "./questions/multichoice";
import { IQType } from "../types";

export interface IAnswer {
    qid: number
    question_type: IQType
    answer: IMultichoiceExpectedAnswerFormat
}

export interface IAnswerQuery {
    id?: number
    form: number
    answers: IAnswer[]
    respondent: number
    form_version?: number
}

class Answer {
    constructor(private pool: PoolClient) {

    }

    public async create(answerObject: IAnswerQuery) {
        try {
            const {
                form,
                answers,
                respondent,
                form_version=1
            } = answerObject

            const dbResponse = await this.pool.query(`
                INSERT INTO answers (
                    form,
                    answers,
                    respondent,
                    form_version
                ) VALUES ($1, $2, $3, $4) RETURNING *;
            `, [form, { data: answers }, respondent, form_version])

            return dbResponse.rows[0]
            
        } catch (err) {
            logError(err)
            throw new Error(err)
        }
    }
}

export default Answer
