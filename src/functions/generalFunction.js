var request = require('request')
var cheerio = require('cheerio');
var fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
    async index(req, res) {
        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyDBx07X2TQl1TQEQbuDYxm1vGzndK3G7d8&cx=017232608039431587026:2zyvwylqmhq&q=Corona&fields=items(link)');
            let findContent = '';
            let file = '';

            Object.entries(response.data.items).map(resp => {
                console.log(resp[1].link);

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

                request(resp[1].link, function(err, res, body) {
                    if (err) console.log(`Erro: ${err}`);
                
                    let $ = cheerio.load(body);

                    // Apaga o arquivo de texto
                    fs.truncate(`${path.resolve(`src/data/${file}${resp[0]}.txt`)}`, () => { return;});
                
                    $(findContent).each(function() {
                        let content = $(this).find('p').text().trim();
                
                        if(content == "") {
                            return;
                        } else {
                            // Criar arquivo de texto
                            fs.appendFile(`${path.resolve(`src/data/${file}${resp[0]}.txt`)}`, `${content} \n`, () => { return;});
                        }
                    });
                });
            });
            res.send(`<a href="${path.resolve('src/data/G1.txt')}" download="G19 Teste.txt">Download</a>`);
                  
        } catch (error) {
            alert('No funfo')
        }
    },
}