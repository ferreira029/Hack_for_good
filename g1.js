var request = require('request')
var cheerio = require('cheerio');
var fs = require('fs');

let link = 'https://g1.globo.com/fato-ou-fake/noticia/2020/04/01/no-1o-de-abril-veja-o-que-e-fato-em-meio-a-pandemia-do-coronavirus.ghtml'

request(link, function(err, res, body) {
    if (err) console.log('Erro ' + err);

    let $ = cheerio.load(body);
    fs.truncate('imdb.txt', () => { return;});

    $('div.content-text').each(function() {
        let content = $(this).find('p').text().trim();

        if(content == "") {
            return;
        } else {
            // Criar arquivo de texto
            fs.appendFile('imdb.txt', `${content} \n`, () => { return;});
        }

    });
});