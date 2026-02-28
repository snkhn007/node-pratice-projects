const http = require('http');
const server = http.createServer((req, res)=>{
    console.log(req.url);
    console.log(req.method);
    const url = req.url.toLowerCase();

    res.setHeader('Content-Type', 'text/html');
    if (url === '/favicon.ico') {
        res.statusCode = 204;
        return res.end();
    }else if(url === '/' && req.method === 'GET'){
        res.statusCode = 302;
        res.setHeader('Location', '/home');
        return res.end(); //redirect should return
    }else if(url === '/men' && req.method === 'GET'){
        res.write("Welcome to mens page");
        return res.end();
    }else if(url === '/women' && req.method === 'GET'){
        res.write("Welcome to women page");
        return res.end();
    }else if(url === '/kids' && req.method === 'GET'){
        res.write("Welcome to kids page");
        return res.end();
    }else if(url === '/home' && req.method === 'GET'){
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div class="nav">
                <a href="/men">MEN</a>
                <a href="/women">WOMEN</a>
                <a href="/kids">KIDS</a>
                <a href="/home">HOME</a>
                <a href="/beauty">BEAUTY</a>
                <a href="/genz">GENZ</a>
            </div>
        </body>
        </html>`)
        return res.end();
    }else if(url === '/beauty' && req.method === 'GET'){
        res.write("Welcome to beauty page");
        return res.end();
    }else if(url === '/genz' && req.method === 'GET'){
        res.write("Welcome to genz page");
        return res.end();
    }else{
        res.write("Invalid");
        return res.end();
    }
});
server.listen(3000, ()=>{
    console.log("Started listeining..");
})