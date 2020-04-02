// Instanciando variáveis
var request = require('request')
var cheerio = require('cheerio');
var fs = require('fs');
const path = require('path');
const axios = require('axios');

// Deixando a chamada "estática"
module.exports = {
    async index(req, res) {
        try {
            // Faz a pequisa na API do google que retorna o JSON com os links
            const response = await axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyDBx07X2TQl1TQEQbuDYxm1vGzndK3G7d8&cx=017232608039431587026:2zyvwylqmhq&q=Corona%20em%20são%20paulo&fields=items(link)');
            let findContent = '';
            let file = '';

            // Pega os itens do JSON e transforma em array
            Object.entries(response.data.items).map(async resp => {
                console.log(resp[1].link);

                // Verifica de qual site se trata o link e preenche as variáveis
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

                // Chamada assíncrona para preencher os arquivos de texto com o conteúdo das páginas da pesquisa
                await request(resp[1].link, function(err, res, body) {
                    if (err) console.log(`Erro: ${err}`);
                
                    let $ = cheerio.load(body);

                    // Apaga o arquivo de texto
                    fs.truncate(`${path.resolve(`src/data/${file}${resp[0]}.txt`)}`, () => { return;});
                
                    // Pega o conteudo dos 'p' das páginas
                    $(findContent).each(function() {
                        let content = $(this).find('p').text().trim();
                
                        if(content == "") {
                            return;
                        } else {
                            // Cria/preenche o arquivo de texto
                            fs.appendFile(`${path.resolve(`src/data/${file}${resp[0]}.txt`)}`, `${content} \n`, () => { return;});
                        }
                    });
                });
            });
            // Coloca no site local o botão de download
            res.send(`<a href="${path.resolve('src/data/G1.txt')}" download="G19 Teste.txt">Download</a>`);
                  
        } catch (error) {
            alert('No funfo')
        }
    },
}