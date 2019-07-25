import path from 'path'
import fs from 'fs'

export function getPrivateKey(filename: string='private.key'): Promise<string> {
    const pathToPrivateKey = path.resolve(__dirname, '..', 'files', filename)
    return new Promise((resolve, reject) => {
        fs.readFile(pathToPrivateKey, 'utf8', (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
