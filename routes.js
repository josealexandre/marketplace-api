const express = require('express')
const routes = express.Router()

const validate = require('express-validation')
const handle = require('express-async-handler')

const authMiddleware = require('./app/middlewares/auth')
const validators = require('./app/validators')

const controllers = require('./app/controllers')

routes.post(
    '/users',
    validate(validators.User),
    handle(controllers.UserController.store)
)
routes.post(
    '/sessions',
    validate(validators.Session),
    handle(controllers.SessionController.store)
)

// Every route from here is gonna use the authMiddleware
routes.use(authMiddleware)

// Ads
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
    '/ads',
    validate(validators.Ad),
    handle(controllers.AdController.store)
)
routes.put(
    '/ads/:id',
    validate(validators.Ad),
    handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

// Purchases
routes.post(
    '/purchases',
    validate(validators.Purchase),
    handle(controllers.PurchaseController.store)
)

// Sales
routes.post(
    '/sales',
    validate(validators.Sale),
    handle(controllers.SaleController.store)
)

module.exports = routes
