const connection = require('./../database/connection');

module.exports = {
    async index(req, res) {
        const users = await connection('users').select('*');
        return res.json(users);
    },

    async create(req, res) {
        const { name, whatsapp } = req.body;

        await connection('users').insert({
            name,
            whatsapp,
        });

        return res.json({ success: "Parabéns você foi cadastrado com sucesso!"});
    },
}