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
            text: "na China, onde foram registrados os primeiros casos da covid-19".toUpperCase(),
            search: "afojfoafpwqpwkqpofwnfqpwf wfssfas fs´mafpqf Corona em são paUlo nasnfonfa ijoasf-afs".toUpperCase()
        };

        try {
            let search = "casos de corona virus em sao paulo uol";
            // Faz a pequisa na API do google que retorna o JSON com os links
            const response = await axios.get(`https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyDECtd0EdDZv3Tr85q8Vv7i-126gHSiOQI&cx=017232608039431587026:2zyvwylqmhq&q=${search}&fields=items(link)`).catch(err => console.log(`API DO GOOGLE NÃO FUNCIONA, ${err}`));
            let findContent = '';
            //let file = '';

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

                // Chamada assíncrona para preencher o conteúdo das páginas da pesquisa
                await request(resp[1].link, function (err, res, body) {
                    if (err) console.log(`Erro: ${err}`);

                    let $ = cheerio.load(body);

                    // Pega o conteudo dos 'p' das páginas
                    $(findContent).each(function () {
                        let content = $(this).find('p').text().trim().toUpperCase();
                        if (content == "") {
                            return;
                        } else {
                            // Cria/preenche o conteudo
                            let arrayUser = userData.text.split(" ");

                            for (i = 0; i < arrayUser.length; i++) {
                                let position;
                                //console.log(arrayUser[i]);
                                position = content.search(arrayUser[i]);
                                // Debug improvisado
                                //console.log("\nSite pesquisado: " + resp[1].link + "\nConteudo:" + content + "\nO que foi procurado:" + arrayUser[i] +
                                //"\nA posição da procura é: " + position + " no contetudo");

                                if (position > -1) {
                                    // Retorna o texto cortado com o a primeira palavra da pesquisa
                                    let cut = content.slice(position, content.length);
                                    //console.log(cut);

                                    // <--- Começa o segundo corte da pesquisa --->
                                    for (j = arrayUser.length - 1; j > 0; j--) {

                                        let position2;

                                        // Pega a palavra de posição [j] da pesquisa
                                        let strF = arrayUser[j];

                                        // Corta a pesquisa novamente com o a ultima palavra da pesquisa
                                        position2 = cut.search(strF);

                                        if (position2 > -1) {
                                            position2 += strF.length; // Adiciona o tamanho da palavra para ela não sumir no resultado
                                            // Retorna o texto cortado com a ultima palavra da pesquisa
                                            let final = cut.slice(0, position2);
                                            //console.log(final);
                                            percent = levenshtein.levenshtein(userData.text.toUpperCase(), final.toUpperCase());

                                            // Apresenta a resposta se a porcentagem de veracidade da pesquisa for maior que 60%

                                            /* if(percent > 60) {
                                                console.log("\nSite pesquisado: " + resp[1].link + "\nO que foi procurado:" + arrayUser[i] +
                                            "\nA posição da procura é: " + position + " no contetudo" + 
                                                `\nConteudo: ${content}\nInformação: ${final}\nA pesquisa: "${userData.text}" é ${percent}% verídica`);
                                                return true;
                                            } else {
                                                return false;
                                            } */
                                            if (percent > 60) {
                                                console.log("\nSite pesquisado: " + resp[1].link + "\nO que foi procurado:" + arrayUser[i] +
                                                    "\nA posição da procura é: " + position + " no contetudo" +
                                                    `\nConteudo: ${content}\nInformação: ${final}\nA pesquisa: "${userData.text}" é ${percent}% verídica`);
                                                return true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                });
            });

        } catch (error) {
            console.log(error);
        }
    },
}