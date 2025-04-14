// const http = require('http');
// const fs = require('fs');
// const server = http.createServer((req,res)=>{
//     console.log(req.url);
//     switch (req.url){
//         case '/':
//             res.setHeader('Content-Type','text/html');
//             res.statusCode=200;
//             fs.readFile('./index.html',(err,data)=>{
//                 if (err){
//                     console.log(err);
//                     res.end();
//                 }
//                 else{
//                     res.write(data);
//                     res.end();
//                 }
//             })
//             break;
//         case '/style.css':
//             res.setHeader('Content-Type','text/css');
//             res.statusCode=200;
//             fs.readFile('./style.css',(err,data)=>{
//                 if (err){
//                     console.log(err);
//                     res.end();
//                 }
//                 else{
//                     res.write(data);
//                     res.end();
//                 }
//             })
//             break;
//         case '/script.js':
//             res.setHeader('Content-Type','text/js');
//             res.statusCode=200;
//             fs.readFile('./script.js',(err,data)=>{
//                 if (err){
//                     console.log(err);
//                     res.end();
//                 }
//                 else{
//                     res.write(data);
//                     res.end();
//                 }
//             })
//             break;
//     }

    
// });
// server.listen(3000,'localhost',(err)=>{
//     console.log('listenging on 3000');
// });
import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// app.get("/style.css", (req, res) => {
//   res.sendFile('./style.css',{root: __dirname});
// });
// app.get("/script.js", (req, res) => {
//   res.sendFile('./script.js',{root: __dirname});
// });

app.listen(port, () => {
    console.log("Sergeant we have a server on the loose...someone catch it");
});