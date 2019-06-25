const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
    async store (req, res) {
        const { content, ad } = req.body

        const purchaseAd = await Ad.findById(ad).populate('author')
        const user = await User.findById(req.userId)

        Mail.sendMail()

        await Mail.sendMail({
            from: '"Alexandre Junior" <jasj_jr@hotmail.com>', // sender address
            to: purchaseAd.author.email,
            subject: `Solicitação de compra: ${purchaseAd.title}`,
            html: `<p>Teste: ${content}</p>`
        })

        return res.send()
    }
}

module.exports = new PurchaseController()