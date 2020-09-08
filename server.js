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
    var resultado = [];
    figuraPlana.forEach((poligono, indice) => {
        switch (poligono.objeto.toUpperCase()) {
            case 'TRIANGULO':
                var calculaPerimetro = poligono.lados.reduce((total, num) => total + num);
                var objetoRetorno = {
                    "objeto": poligono.objeto,
                    "lados": poligono.lados,
                    "resultado": calculaPerimetro
                };
                resultado.push(objetoRetorno);
                break;
            case 'RETANGULO':
                var calculaPerimetro = poligono.lados
                    .reduce(
                        (total, num) => (total * 2) + (num * 2)
                    );
                var objetoRetorno = {
                    "objeto": poligono.objeto,
                    "lados": poligono.lados,
                    "resultado": calculaPerimetro
                };
                resultado.push(objetoRetorno);
                break;
            case 'QUADRADO':
                var calculaPerimetro = poligono.lados[0] * 4
                var objetoRetorno = {
                    "objeto": poligono.objeto,
                    "lados": poligono.lados,
                    "resultado": calculaPerimetro
                };
                resultado.push(objetoRetorno);
                break;
            default:
                break;
        }
    });
    return resultado;
}

const server = restify.createServer({
    name: 'Server Node',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/quadrado/:ladoa/:ladob', function (req, res, next) {
    var results = calcularAreaQuadrado(req.params.ladoa, req.params.ladob);
    req.accepts('application/json');
    res.contentType = 'json';
    res.send({ ladoA: parseInt(req.params.ladoa), ladoB: parseInt(req.params.ladob), resultado: results });
    return next();
});

server.post('/perimetro', function (req, res, next) {
    var result = calcularPerimetroPor(req.body);
    res.send(result);
    return next();
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});