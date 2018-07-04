let express = require('express')
let superagent  = require('superagent')
let cheerio = require('cheerio')
// url 是Node.js 标准库里面的
let url = require('url') 
let process = require('process')

let cnodeUrl = 'https://cnodejs.org/'

process.on('unhandledRejection', err => {
    console.log('unhandledRejection', err)
})

superagent.get(cnodeUrl)
    .then((res) => {
        let $ = cheerio.load(res.text)
        let topicUrls = []
        // 获取首页的所有链接
        $('#topic_list .topic_title').each((i, elem) => {
            let $elem = $(elem)
            let href = url.resolve(cnodeUrl, $elem.attr('href'))
            topicUrls.push(href)
        })
        let promiseFetch = []
        topicUrls = topicUrls.slice(0, 14)
        topicUrls.forEach(url => {
            let promise = new Promise((resolve, reject) => {
                superagent.get(url)
                    .then(res => {
                        console.log('fetch---' + url + '---successful')
                        // console.log(res)
                        resolve([url, res.text])
                    })
                    .catch(err => {
                        reject(err)
                        // console.log('err', err)
                    })
            })
           
            promiseFetch.push(promise)
        })
        Promise.all(promiseFetch).then(res => {
            let topics = res.map(item => {
                let url = item[0]
                let html = item[1]
                let $ = cheerio.load(html)
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: url,
                    comment1: $('.reply_content').eq(0).text().trim(),
                })
            })    
            console.log(topics)        
        }).catch(e => {
            console.log('all-e', e)
        })
    })
    .catch((e) => {
        console.log(e)
    })

