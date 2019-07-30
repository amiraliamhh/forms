import { PoolClient } from "pg";

export interface ISimpletext {
    id: number
    question: string
    is_optional?: boolean|null
}

class Simpletext {
    constructor(private pool: PoolClient) {

    }

    public async create(simpletextQuestion: ISimpletext) {
        try {
            const {
                question,
                is_optional=true
            } = simpletextQuestion

            const dbResponse = await this.pool.query(`
                INSERT INTO simpletext (
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

export default Simpletext
