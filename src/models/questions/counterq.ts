import { PoolClient } from "pg";

export interface ICounterq {
    id: number
    question: string
    max_count: number
    is_optional: boolean
}

class Counterq {
    constructor(private pool: PoolClient) {

    }

    public async create(counterqQuestion: ICounterq) {
        try {
            const {
                question,
                max_count,
                is_optional
            } = counterqQuestion

            const dbResponse = await this.pool.query(`
                INSERT INTO counterq (
                    question,
                    max_count,
                    is_optional
                ) VALUES ($1, $2, $3) RETURNING *;
            `, [question, max_count, is_optional])

            return dbResponse.rows[0]
        } catch (err) {
            throw new Error(err)
        }
    }
}

export default Counterq
