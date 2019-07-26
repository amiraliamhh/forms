import { PoolClient } from "pg";
import { IQuestion } from "../types";
import { logError } from "../utils";

export interface IForm {
    id?: number
    form_name: string
    owner: number
    questions: IQuestion[]
    is_active?: boolean
    version?: number
}

class Form {
    constructor(private pool: PoolClient) {

    }

    public async create(form: IForm) {
        try {
            const {
                form_name,
                owner,
                questions,
                is_active=true
            } = form

            const dbResponse = await this.pool.query(`
                INSERT INTO forms (
                    form_name,
                    owner,
                    questions,
                    is_active,
                    version
                ) VALUES ($1, $2, $3, $4, 1) RETURNING *;
            `, [form_name, owner, { data: questions }, is_active])
            
            return dbResponse.rows[0]

        } catch (err) {
            logError(err)
            throw new Error(err)
        }
    }

    public async getAll() {
        try {
            const dbResponse = await this.pool.query(`
                SELECT * FROM forms;
            `)

            return dbResponse.rows

        } catch (err) {
            logError(err)
            throw new Error(err)
        }
    }
}

export default Form
