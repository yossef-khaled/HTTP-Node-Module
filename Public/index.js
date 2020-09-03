const http = require('http');

const hostName = "LocalHost";
const port = 3000;

// req is the request from the client to the server and res is the response constructed by this server and returned to the client
const server = http.createServer((req, res) => {
    console.log("The request is : ");
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello World!!</h1></body></html>');
})

server.listen(port, hostName, () => {
    console.log(`Server is running at http://${hostName}:${port}`);
})