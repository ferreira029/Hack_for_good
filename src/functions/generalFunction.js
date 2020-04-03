// Instanciando variáveis
var request = require('request')
var cheerio = require('cheerio');
var fs = require('fs');
const path = require('path');
const axios = require('axios');
const levenshtein = require('./levenshtein');

let percent;

// Deixando a chamada "estática"
module.exports = {
    async index(req, res) {

        const userData = {
            text: "Corona em são paulo".toUpperCase(),
            search: "afojfoafpwqpwkqpofwnfqpwf wfssfas fs´mafpqf Corona em são paUlo nasnfonfa ijoasf-afs".toUpperCase()
        };

        try {

            // Faz a pequisa na API do google que retorna o JSON com os links
            const response = await axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyDECtd0EdDZv3Tr85q8Vv7i-126gHSiOQI&cx=017364834723098479907:hiqtvhyt05s&q=Corona&fields=items(link)').catch(err => console.log(`API DO GOOGLE NÃO FUNCIONA, ${err}`));
            let findContent = '';
            let file = '';

            // Pega os itens do JSON e transforma em array
            Object.entries(response.data.items).map(async resp => {
                //console.log(resp[1].link);

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
                await request(resp[1].link, function (err, res, body) {
                    if (err) console.log(`Erro: ${err}`);

                    let $ = cheerio.load(body);

                    // Apaga o arquivo de texto
                    fs.truncate(`${path.resolve(`src/data/${file}${resp[0]}.txt`)}`, () => { return; });

                    // Pega o conteudo dos 'p' das páginas
                    $(findContent).each(function () {
                        let content = $(this).find('p').text().trim();

                        if (content == "") {
                            return;
                        } else {
                            // Cria/preenche o arquivo
                            let arrayUser = userData.text.split(" ");

                            for (i = 0; i < arrayUser.length; i++) {
                                let position;
                                position = userData.search.search(arrayUser[i]);

                                if (position > -1) {
                                    // Retorna o texto cortado com o a primeira palavra da pesquisa
                                    let cut = userData.search.slice(position, userData.search.length);

                                    // <--- Começa o segundo corte da pesquisa --->
                                    for (j = arrayUser.length - 1; j > 0; j--) {

                                        let position2;

                                        // Pega a palavra de posição [j] da pesquisa
                                        let strF = arrayUser[j];
                                        //console.log(strF);
                                        // Corta a pesquisa novamente com o a ultima palavra da pesquisa
                                        position2 = cut.search(strF);

                                        if (position2 > -1) {
                                            position2 += strF.length; // Adiciona o tamanho da palavra para ela não sumir no resultado
                                            // Retorna o texto cortado com a ultima palavra da pesquisa
                                            let final = cut.slice(0, position2);
                                            //console.log(final);
                                            percent = levenshtein.levenshtein(userData.text.toUpperCase(), final.toUpperCase());

                                            // Apresenta a porcentagem de veracidade da pesquisa
                                            console.log(`A informação: "${final}" é ${percent}% verídica`);
                                            return true;
                                        }
                                    }

                                    return true;
                                }

                                //percent >= 60 ? true : false;

                                // Ver em qual posição do texto está a pesquisa
                                //console.log(`${arrayUser[i]} está na posição: ${userData.pesq.search(arrayUser[i])} do texto`);
                            }

                            // Criar arquivo de texto
                            //fs.appendFile(`${path.resolve(`../data/${file}${resp[0]}.txt`)}`, `${content} \n`, () => { return;});
                        }
                    });
                });
            });
            // Coloca no site local o botão de download
            res.send(`<a href="${path.resolve('../data/G1.txt')}" download="G19 Teste.txt">A porcentagem de igualdade entre os textos é de ${percent}%</a>`);
            //res.send(`<a href="${path.resolve('src/data/G1.txt')}" download="G19 Teste.txt">Download</a>`);
            //document.write(`<p>A porcentagem de igualdade entre os textos é de ${porcent}%`)

        } catch (error) {
            console.log(error);
        }
    },
}

