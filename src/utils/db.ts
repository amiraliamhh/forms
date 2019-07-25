import path from 'path'
import fs from 'fs'

// sql file MUST be located inside `models` directory
export function readQuery(pathToSQLFile: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!pathToSQLFile) {
            reject('pathToSQLFile is empty')
        }
        const filename = `${pathToSQLFile.replace(/\.sql$/, '')}.sql`
        const pathToFile = path.resolve(__dirname, '..', 'models', filename)
        fs.readFile(pathToFile, 'utf8', (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
