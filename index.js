const http = require('http');
const fs = require('fs');
const path = require('path');

const hostName = "LocalHost";
const port = 3000;

// req is the request from the client to the server and res is the response constructed by this server and returned to the client
const server = http.createServer((req, res) => {
    console.log(`Rquest for ${req.url} by method ${req.method}`);

    if(req.method == 'GET') {
        var fileURL;
        if(req.url == '/') fileURL = "/index.html"
        else fileURL = req.url;

        var filePath = path.resolve('./public' + fileURL);
        const fileExtension = path.extname(filePath);
        if(fileExtension == '.html') {
            fs.exists(filePath, (exists) => {
                if(!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>ERROR 404: ${fileURL} NOT found</h1></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                //CreateReadStream function convert the file at 'FilePath' into bytes and pipe function will include it into the res body.
                fs.createReadStream(filePath).pipe(res);
            })
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>ERROR 404: ${fileURL} NOT an HTML file</h1></body></html>`);
            return;
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>ERROR 404: ${req.method} NOT supported</h1></body></html>`);
        return;
    }
})

server.listen(port, hostName, () => {
    console.log(`Server is runnind at http://${hostName}:${port}`);
})