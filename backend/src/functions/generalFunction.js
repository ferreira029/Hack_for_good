var request = require('request')
var cheerio = require('cheerio');
const axios = require('axios');
const levenshtein = require('./levenshtein');

let percent = -2;
let textData = '';
let text = '';
let key1 = "AIzaSyBqd6HmCZG15A-x4vqxI-cxK29bQKdxJMg";
let key2 = "AIzaSyDrujxVHMbEnYFQ1SG_zDiBNVpBJ7yKYDw";
let key3 = "AIzaSyDECtd0EdDZv3Tr85q8Vv7i-126gHSiOQI";
let key4 = "AIzaSyCC1KVerxYxXWeHwCDUsegjz3ipVp58dW4";
let test;


module.exports = {
    async index(req, res) {
        global.responseMsg = undefined;
        textData = req.body.data;
        if (!textData) {
            global.responseMsg = { "empty": "O campo de texto está vazio!" };
            return res.json(global.responseMsg);
        }
        text = textData.toUpperCase();
        try {
            var response = await axios.get(`https://www.googleapis.com/customsearch/v1/siterestrict?key=${key1}&cx=017232608039431587026:2zyvwylqmhq&q=${textData} corona virus&fields=items(link)`).catch(err => test = "Erro");
            if(test === "Erro") {
                response = await axios.get(`https://www.googleapis.com/customsearch/v1/siterestrict?key=${key2}&cx=017232608039431587026:2zyvwylqmhq&q=${textData} corona virus&fields=items(link)`).catch(err => test = "Erro2");
            }
            if(test === "Erro2") {
                response = await axios.get(`https://www.googleapis.com/customsearch/v1/siterestrict?key=${key3}&cx=017232608039431587026:2zyvwylqmhq&q=${textData} corona virus&fields=items(link)`).catch(err => test = "Erro3");
            }
            if(test === "Erro3") {
                response = await axios.get(`https://www.googleapis.com/customsearch/v1/siterestrict?key=${key4}&cx=017232608039431587026:2zyvwylqmhq&q=${textData} corona virus&fields=items(link)`).catch(err => global.responseMsg = { "Error": `API DO GOOGLE NÃO FUNCIONA, ${err}` });
            }

            if (!response.data) {
                global.responseMsg = { "error": "A pesquisa não retornou resutados" };
                return res.json(global.responseMsg);
            }

            if (response.Error) {
                global.responseMsg = response.Error;
                return res.json(global.responseMsg);
            }

            try {
                Object.entries(response.data.items).map(async resp => {
                    if (resp[1].link.includes('https://www.uol.com.br')) {
                        findContent = 'div.text';
                    } else if (resp[1].link.includes('https://g1')) {
                        findContent = 'div.content-text';
                    } else {
                        findContent = 'div.custom';
                    }
                    await request(resp[1].link, function (err, res, body) {
                        if (err) console.log(`Erro: ${err}`);
                        let $ = cheerio.load(body);
                        $(findContent).each(async function () {
                            let content = $(this).find('p').text().trim().toUpperCase();
                            if (content === "") {
                                return;
                            } else {
                                if (global.responseMsg === "") {
                                }
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
                                                if (percent >= 70) {
                                                    msg = await `{"site": "${resp[1].link}", "conteudo": "${content}", "informacao":" ${final}", "pesquisa": "${text}", "porcentagem": "${percent}"}`;
                                                    return global.responseMsg = JSON.parse(msg);
                                    
                                                } else if (global.responseMsg === undefined) {
                                                    return global.responseMsg = { "fake": "A mensagem aparentemente é falsa, pois é menor return do que 70% de certeza" };
                                                }
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
                global.responseMsg = { "error": "A pesquisa não retornou resutados" };
                return res.json(global.responseMsg);
            }
        } catch (error) {
            global.responseMsg = { "failed": "Falha na conexão" };
            return res.json(global.responseMsg);
        }
    },
}