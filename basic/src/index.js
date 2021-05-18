const http = require('http');

const server = http.createServer(function(request, response) {
    response.writeHead(200, { "Content-type": "text/html" });
    response.write("<html><body>HOLA MUNDO</body></html>");
    response.end();
});

server.listen(3000);

function sum(num1, num2) {
    return num1 + num2;
}

console.log("La suma es ", sum(10, 30));