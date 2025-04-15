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
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get('/', (req, res) => {
  if (req.cookies.userid=='admin') {
    res.redirect('/start');
  }
  else{
    res.sendFile('login.html', { root: path.join(__dirname, 'public') });
  }
});
app.get('/start', (req, res) => {
  //res.sendFile('start.html', { root: path.join(__dirname, 'public') });
  if (req.cookies.userid=='admin') {
    res.render('start', { username: req.cookies.userid });
  }
  else{
    res.redirect('/');
  }
});
app.get('/logout', (req, res) => {
  res.clearCookie('userid');
  res.redirect('/');
});


app.post('/login', (req, res) => {
  const { userid, password } = req.body;
  console.log('POST /login', { userid, password });

  if (userid === 'admin' && password === '1234') {
    console.log('Login successful');
    res.cookie('userid','admin',{ maxAge: 3600000, httpOnly: true });
    res.redirect('/start');
    //res.sendFile('start.html', { root: path.join(__dirname, 'public') });
  } else {
    console.log('Login failed');
    res.send('Invalid credentials. Try again.');
  }
});


app.listen(port, () => {
    console.log("Sergeant we have a server on the loose...someone catch it");
});