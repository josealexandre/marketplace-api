const Purchase = require('../models/Purchase')
const Ad = require('../models/Ad')

class SaleController {
    async store (req, res) {
        const { purchaseId } = req.body

        const purchase = await Purchase.findById(purchaseId).populate('ad')

        const updatedAd = await Ad.findByIdAndUpdate(
            purchase.ad,
            { purchasedBy: purchaseId },
            { new: true }
        )

        res.json(updatedAd)
    }
}

module.exports = new SaleController()
