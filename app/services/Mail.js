const config = require('../../config/mail')
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport(config)

module.exports = transport
