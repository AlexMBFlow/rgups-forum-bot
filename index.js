import fetch from 'node-fetch';
import fs from "fs";
import request from "request";
import cheerio from "cheerio"
import axios from "axios"


let markup = null
let URL = "http://forum.vfrgups.ru/";

//временное решение, чтобы знать, какие поля существуют в принципе и какая структура у объектов с опциями запросов
//TODO: для каждого запроса сделать свой конфиг,
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

/* const postConfig = new PostConfigCreator(
    'forum.vfrgups.ru',
    "keep-alive",
    "max-age=0",
    "1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.174 YaBrowser/22.1.5.810 Yowser/2.5 Safari/537.36",
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
) */



const instance = axios.create({
    baseURL: URL,
    //timeout: 1000,
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

const sendData = async (url) => {
    let data = await fetch(url, {
        method: 'POST',
        "cache": "no-cache",
        "headers": {
            "Content-type": "application/x-www-form-urlencoded",
            "Cookie": "SLG_GWPT_Show_Hide_tmp=1; SLG_wptGlobTipTmp=1"
        },
    });
    return data
}


instance.get("http://forum.vfrgups.ru/", {
    params: {
        mode: config.mode,
        sid: config.sid
    }
}).then(response => {
    console.log(response)
}).catch((err) => {
    console.log(err)
})

request(URL, (err, res, body) => {
    if (err) throw err

    fs.writeFile("parcePage/page.html", body, (err) => {
        if (err) throw err
        markup = body
        const $ = cheerio.load(markup, null, false)
        const sid = $(".headerspace")[0].attribs.action.slice(25)
        const token = $("input[name='form_token']")
        //записываем в конфик наш найденный сид
        config.params.sid = sid
        //записываем наш токен 
        config.body.form_token = token
    })
})