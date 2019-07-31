import { PoolClient } from "pg";

export interface IDateandtime {
    id: number
    question: string
    is_optional: boolean
}

class Dateandtime {
    constructor(private pool: PoolClient) {

    }

    public async create(dateandtimeQuestion: IDateandtime) {
        try {
            const {
                question,
                is_optional=true
            } = dateandtimeQuestion

            const dbResponse = await this.pool.query(`
                INSERT INTO dateandtime (
                    question,
                    is_optional
                ) VALUES ($1, $2) RETURNING *;
            `, [question, is_optional])

            return dbResponse.rows[0]
        } catch (err) {
            throw new Error(err)
        }
    }
}

export default Dateandtime
