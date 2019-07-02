const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')

const validate = require('express-validation')
const Youch = require('youch')

class App {
    constructor () {
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'

        this.database()
        this.middlewares()
        this.routes()
        this.exceptions()
    }

    database () {
        mongoose.connect(databaseConfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }

    middlewares () {
        this.express.use(express.json())
    }

    routes () {
        this.express.use(routes)
    }

    exceptions () {
        this.express.use(async (err, req, res, next) => {
            if (err instanceof validate.ValidationError) {
                return res.status(err.status).json(err)
            }

            if (process.env.NODE_ENV !== 'production') {
                const youch = new Youch(err, req)
                return res.json(await youch.toJSON())
                // return res.send(await youch.toHTML())
            }

            return res.status(500).json({ error: 'Internal Server Error' })
        })
    }
}

module.exports = new App().express
