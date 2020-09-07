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

const server = restify.createServer({
    name: 'Server Node',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/perimetro/:lado', function(req, res, next) {
    res.send(req.params);
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