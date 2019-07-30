import { PoolClient } from "pg";

interface IYesorno {
    id: number
    question: string
    is_optional?: boolean
}

class Yesorno {
    constructor(private pool: PoolClient) {

    }

    public async create(yesornoQuestion: IYesorno) {
        try {
            const {
                question,
                is_optional=true
            } = yesornoQuestion

            const dbResponse = await this.pool.query(`
                INSERT INTO yesorno (
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

export default Yesorno
