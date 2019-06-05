const User = require('../models/User')

class SessionController {
    async store (req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ error: 'User not found' })
        }

        if (!(await user.compareHash(password))) {
            return res.json({ error: 'Invalid password' })
        }

        res.json({ user, token: User.generateToken(user) })
    }
}

module.exports = new SessionController()
