import { PoolClient } from "pg";

export interface INumberspan {
    id: number
    question: string
    max_num: number
    min_num: number
    is_optional: boolean
} 

class Numberspan {
    constructor(private pool: PoolClient) {

    }

    public async create(numberspanQuestion: INumberspan) {
        try {
            const {
                question,
                max_num,
                min_num,
                is_optional
            } = numberspanQuestion

            const dbResponse = await this.pool.query(`
                INSERT INTO numberspan (
                    question,
                    max_num,
                    min_num,
                    is_optional
                ) VALUES ($1, $2, $3, $4) RETURNING *;
            `, [question, max_num, min_num, is_optional])

            return dbResponse.rows[0]
        } catch (err) {
            throw new Error(err)
        }
    }
}

export default Numberspan
