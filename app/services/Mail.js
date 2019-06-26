const config = require('../../config/mail')
const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')

const transport = nodemailer.createTransport(config)

const viewPath = path.resolve(__dirname, '..', 'views', 'emails')

transport.use(
    'compile',
    hbs({
        viewEngine: exphbs.create({
            partialsDir: path.resolve(viewPath, 'partials'),
            defaultLayout: null
        }),
        viewPath,
        extName: '.hbs'
    })
)

module.exports = transport
