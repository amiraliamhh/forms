require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'

import { initialize } from './start'
import router from './endpoints'

const app = express()

app.use(bodyParser.json())

app.use('/api', router)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await initialize()
    
        app.listen(PORT, () => {
            console.info(`Listening on port ${PORT}`)
        })
    } catch (err) {
        throw err
    }
}

start()
