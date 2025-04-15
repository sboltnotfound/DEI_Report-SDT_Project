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
import { createRequire } from "module";
const require = createRequire(import.meta.url);

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
  if (req.cookies.userid) {
    res.redirect('/start');
  }
  else{
    res.sendFile('login.html', { root: path.join(__dirname, 'public') });
  }
});

app.get('/start', async function(req, res){
  //res.sendFile('start.html', { root: path.join(__dirname, 'public') });
  if (req.cookies.userid) {
    var {flag, id} = await user_query2(req.cookies.userid);
    console.log("e"+id);
    res.render('start', { username: id });
  }
  else{
    res.redirect('/');
  }
});
app.get('/logout', (req, res) => {
  res.clearCookie('userid');
  res.redirect('/');
});

async function user_query(userid,password){
  return new Promise((resolve,reject)=>{
    var flag=0;
    var id="";
    con.query('select * from uspas where usnam=\''+userid+'\' and uspass=\''+password+'\'',(errr,ress)=>{
      if (errr){
        console.log(errr);
        reject(err);
      }
      else if(ress.rowCount!==0){
        flag=1;
        id = ress.rows[0]["usid"];
      }
      con.end;
      resolve({flag, id});
    });
  })
}
async function user_query2(userid){
  return new Promise((resolve,reject)=>{
    var flag=0;
    var id="";
    con.query('select * from uspas where usid=\''+userid+'\'',(errr,ress)=>{
      if (errr){
        console.log(errr);
        reject(err);
      }
      else if(ress.rowCount!==0){
        flag=1;
        id = ress.rows[0]["usnam"];
      }
      con.end;
      console.log(id);
      resolve({flag, id});
      
    });
  })
}
app.post('/login',async function(req, res,next){
  const { userid, password } = req.body;
  console.log('POST /login', { userid, password });
  var {flag, id}= await user_query(userid,password);
  //var id="";
  
  if (flag===1) {
    console.log('Login successful');
    res.cookie('userid',id,{ maxAge: 3600000, httpOnly: true });
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


const {Client}=require('pg');
const con = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:bruh@localhost:5432/DEI_Report',
    ssl: process.env.DATABASE_URL ? true : false
});

con.connect().then(()=>{
  console.log("connected!");
});