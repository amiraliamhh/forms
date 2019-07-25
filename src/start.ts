import { getClient } from "./connection-pool";
import { readQuery } from "./utils";

export async function initialize() {
    try {
        const client = await getClient()
        const query = await readQuery('initial')
        await client.query(query)
        console.info('Successfully ran initializtion query')
        return
    } catch (err) {
        throw err
    }
}