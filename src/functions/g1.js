var request = require('request')
var cheerio = require('cheerio');
var fs = require('fs');
const path = require('path');

module.exports = {
    g1(req, res) {
        let link = 'https://g1.globo.com/educacao/noticia/2020/04/01/bolsonaro-suspende-obrigatoriedade-de-dias-minimos-do-ano-letivo-mas-mantem-carga-horaria.ghtml';
        
        try {
            request(link, function(err, res, body) {
                if (err) console.log('Erro ' + err);
            
                let $ = cheerio.load(body);
                // Apaga o arquivo de texto
            
                fs.truncate(path.dirname('./../') + 'data/G1.txt', () => { return;});
            
                $('div.content-text').each(function() {
                    let content = $(this).find('p').text().trim();
            
                    if(content == "") {
                        return;
                    } else {
                        // Criar arquivo de texto
                        fs.appendFile(path.dirname('./../') + 'data/G1.txt', `${content} \n`, () => { return;});
                    }
                });
            });
    
            res.send(`<a href="${path.dirname('./../')}data/G1.txt">Download</a>`);      
        } catch (error) {
            alert('No funfo')
        }
    },
}