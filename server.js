const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
    console.log(req.url);
    switch (req.url){
        case '/':
            res.setHeader('Content-Type','text/html');
            res.statusCode=200;
            fs.readFile('./index.html',(err,data)=>{
                if (err){
                    console.log(err);
                    res.end();
                }
                else{
                    res.write(data);
                    res.end();
                }
            })
            break;
        case '/style.css':
            res.setHeader('Content-Type','text/css');
            res.statusCode=200;
            fs.readFile('./style.css',(err,data)=>{
                if (err){
                    console.log(err);
                    res.end();
                }
                else{
                    res.write(data);
                    res.end();
                }
            })
            break;
        case '/script.js':
            res.setHeader('Content-Type','text/js');
            res.statusCode=200;
            fs.readFile('./script.js',(err,data)=>{
                if (err){
                    console.log(err);
                    res.end();
                }
                else{
                    res.write(data);
                    res.end();
                }
            })
            break;
    }

    
});
server.listen(3000,'localhost',(err)=>{
    console.log('listenging on 3000');
});