const connection = require('./../database/connection');

module.exports = {
    async create(req, res) {
        const { whatsapp } = req.body;

        const user = await connection('users').where('whatsapp', whatsapp).first();

        if (!user) {
            return res.status(400).json( { error: "Whatsapp not found!" } );
        }

        return res.json(user);
    }
}