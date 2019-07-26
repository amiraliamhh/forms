import { PoolClient } from "pg";
import { IQuestionCreator } from "../../types/models";

export interface IMultichoice {
    id: number
    question: string
    choices?: string[]|null
    supports_other?: boolean|null
    other?: string|null
    is_optional?: boolean|null
}

export interface IMultichoiceExpectedAnswerFormat {
    choice: number
}

class Multichoice implements IQuestionCreator<IMultichoice> {
    constructor(private pool: PoolClient) {

    }

    public async create(multichoiceQuestion: IMultichoice) {
        try {
            const {
                question,
                choices=null,
                supports_other=null,
                other=null,
                is_optional=true
            } = multichoiceQuestion

            const dbResponse = await this.pool.query(`
                INSERT INTO multichoice (
                    question,
                    choices,
                    supports_other,
                    other,
                    is_optional
                ) VALUES ($1, $2, $3, $4, $5) RETURNING *;
            `, [question, choices, !!supports_other, other, is_optional])

            return dbResponse.rows[0]
        } catch (err) {
            throw new Error(err)
        }
    }
}

export default Multichoice
