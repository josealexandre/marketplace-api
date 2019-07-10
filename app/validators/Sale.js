const joi = require('joi')

module.exports = {
    body: {
        purchaseId: joi.string().required()
    }
}
