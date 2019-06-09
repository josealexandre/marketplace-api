const Ad = require('../models/Ad')

class AdController {
    async index (req, res) {
        const filters = {}

        const { price_min: priceMin, price_max: priceMax, title } = req.query

        if (priceMin || priceMax) {
            filters.price = {}

            if (priceMin) {
                filters.price.$gte = priceMin
            }

            if (priceMax) {
                filters.price.$lte = priceMax
            }
        }

        if (title) {
            filters.title = new RegExp(title, 'i')
        }

        const ad = await Ad.paginate(filters, {
            page: req.query.page || 1,
            limit: 20,
            sort: '-createdAt',
            populate: ['author']
        })

        return res.json(ad)
    }

    async show (req, res) {
        const ad = await Ad.findById(req.params.id)

        return res.json(ad)
    }

    async store (req, res) {
        const ad = await Ad.create({ ...req.body, author: req.userId })

        return res.json(ad)
    }

    async update (req, res) {
        const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false
        })

        return res.json(ad)
    }

    async destroy (req, res) {
        await Ad.findByIdAndDelete(req.params.id, { useFindAndModify: false })

        return res.send()
    }
}

module.exports = new AdController()
