import { Pool, PoolClient } from 'pg'

const pool = new Pool()

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

process.on('exit', () => {
    pool.end()
})

export async function getClient(): Promise<PoolClient> {
    try {
        const client = await pool.connect()
        return client
    } catch (err) {
        throw err
    }
}
