import express from 'express';
import session from "express-session";
import axios from "axios";
import http from "http";
import bodyParser from "body-parser";

const app = express();
//variable
const host = 'localhost';
const port = 3000;
let markup = null;
let URL = "http://forum.vfrgups.ru/";
const config = {
  headers: {
      'Host': 'forum.vfrgups.ru',
      "Connection": "keep-alive",
      "Content-Length": "251",
      "Cache-Control": "max-age=0",
      "Upgrade-Insecure-Requests": "1",
      "Origin": "http://forum.vfrgups.ru",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.174 YaBrowser/22.1.5.810 Yowser/2.5 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Referer": "http://forum.vfrgups.ru/",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "ru,en;q=0.9"
  },
  params: {
      mode: "login",
      sid: null
  },
  body: {
      userName: null,
      password: null,
      login: "Вход",
      redirect: null,
      creation_time: null,
      form_token: null,
  }
}

const instance = axios.create({
  baseURL: URL,
  headers: {
      'Host': 'forum.vfrgups.ru',
      "Connection": "keep-alive",
      "Cache-Control": "max-age=0",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.174 YaBrowser/22.1.5.810 Yowser/2.5 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Referer": "http://forum.vfrgups.ru/",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "ru,en;q=0.9"
  }
});

//app.use
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'hitotsu',
    saveUninitialized: true,
  })
)
app.use(bodyParser.urlencoded({ extended: true }))

//route
app.post('/ad', (req, res) => {
  req.session.showAd = req.body.showAd
  res.sendStatus(200)
})

app.get('/', (req, res) => {
  console.log(req.session.showAd)
  res.sendStatus(200)
})

//start server
app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`)
})