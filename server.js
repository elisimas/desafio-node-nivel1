var restify = require('restify');

//calcular a area do quadrado 
function calcularAreaQuadrado(ladoA, ladoB) {
    var area = parseInt(ladoA) * parseInt(ladoB);
    return area;
}

//calcular a aarea do perimetro do quadrado
function calcularAreaPerimetro(lado) {
    var perimetro = parseInt(lado) * 4;
    return perimetro;
}

function calcularPerimetroPor(figuraPlana) {
    console.log(figuraPlana);
    switch (figuraPlana.objeto.toUpperCase()) {
        case 'TRIANGULO':
            console.log(figuraPlana);
            console.log(lados);

            break;
        case 'RETANGULO':

            break;
        case 'QUADRADO':

            break;
        default:
            break;
    }

}

const server = restify.createServer({
    name: 'Server Node',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/perimetro', function(req, res, next) {
    //res.send(req.params);
    // var calculaperimetro = parseInt(req.body.lado) * 4;
    //res.send({ lado: parseInt(req.body.lado), resultado: calculaperimetro });
    var corpo = [];
    corpo = req.body;
    //console.log(corpo[1]);
    calcularPerimetroPor(corpo[0].objeto, corpo[0].lados);
    res.send(corpo);
    return next();
});

server.get('/quadrado/:ladoa/:ladob', function(req, res, next) {
    var results = calcularAreaQuadrado(req.params.ladoa, req.params.ladob);
    req.accepts('application/json');
    res.contentType = 'json';
    res.send({ ladoA: parseInt(req.params.ladoa), ladoB: parseInt(req.params.ladob), resultado: results });
    return next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});