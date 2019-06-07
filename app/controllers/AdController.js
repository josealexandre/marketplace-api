const Ad = require('../models/Ad')

class AdController {
    async index (req, res) {
        const ad = await Ad.paginate(
            {},
            {
                page: req.query.page || 1,
                limit: 20,
                sort: '-createdAt',
                populate: ['author']
            }
        )

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
