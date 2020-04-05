// Instanciando variáveis
var request = require('request')
var cheerio = require('cheerio');
const axios = require('axios');
const levenshtein = require('./levenshtein');

let percent = -2;
let textData = '';
let text = '';

module.exports = {
    async index(req, res) {
        textData = `${req.body.data}`;
        if(!textData) {
            global.responseMsg = { "Error": "O campo de texto está vazio!" };
            res.json(global.responseMsg);
            return;
        }
        text = textData.toUpperCase();
        try {
            const response = await axios.get(`https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyDrujxVHMbEnYFQ1SG_zDiBNVpBJ7yKYDw&cx=017232608039431587026:2zyvwylqmhq&q=${textData} coronavirus&fields=items(link)`).catch(err => global.responseMsg = { "Error" :`API DO GOOGLE NÃO FUNCIONA, ${err}` });
            if(!response.data) {
                res.json(global.responseMsg);
                return;
            }
            Object.entries(response.data.items).map(async resp => {
                if (resp[1].link.includes('https://www.uol.com.br')) {
                    findContent = 'div.text';
                    file = 'UOL';
                } else if (resp[1].link.includes('https://g1')) {
                    findContent = 'div.content-text';
                    file = 'G';
                } else {
                    findContent = 'div.custom';
                    file = 'Saude';
                }
                await request(resp[1].link, function (err, res, body) {
                    if (err) console.log(`Erro: ${err}`);
                    let $ = cheerio.load(body);
                    $(findContent).each(async function () {
                        let content = $(this).find('p').text().trim().toUpperCase();
                        if (content == "") {
                            return;
                        } else {
                            let arrayUser = text.split(" ");
                            for (i = 0; i < arrayUser.length; i++) {
                                let position;
                                position = content.search(arrayUser[i]);
                                if (position > -1) {
                                    let cut = content.slice(position, content.length);
                                    for (j = arrayUser.length - 1; j > 0; j--) {
                                        let position2 = -2;
                                        let strF = arrayUser[j];
                                        position2 = cut.search(strF);
                                        if (position2 > -1) {
                                            position2 += strF.length;
                                            let final = cut.slice(0, position2);
                                            percent = levenshtein.levenshtein(text.toUpperCase(), final.toUpperCase());
                                            if (percent >= 60) {
                                                msg = await `{"Site": "${resp[1].link}", "Conteudo": "${content}", "Informacao":" ${final}", "Pesquisa": "${text}", "Porcentagem": "${percent}"}`;
                                                global.responseMsg = JSON.parse(msg);
                                                console.log(msg);
                                                return true;
                                            } /* else if (percent < 60) {
                                                global.responseMsg = await JSON.parse('{ "Error": "A mensagem aparentemente é falsa, pois é menor do que 60% de certeza" }');
                                            } */
                                        }
                                    }
                                }
                            }
                        }
                    });
                });
            });
            res.json(global.responseMsg);
        } catch (error) {
            console.log(error);
        }
    },
}
