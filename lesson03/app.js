let express = require('express')
let cheerio = require('cheerio')
let superagent = require('superagent')
let app = express()

app.get('/', (req, res, next) => {
    superagent.get('https://cnodejs.org/')
        .end((err, sres) => {
            if (err) {
                return next(err)
            }
            console.log(sres)
            let $ = cheerio.load(sres.text)
            let item = []
            $('#topic_list .topic_title').each((index, ele) => {
                let $ele = $(ele)
                item.push({
                    title: $ele.attr('title'),
                    href: $ele.attr('href')
                })
            })
            res.send(item)
        })
})

app.listen(3000, () => {
    console.log('app is listening at 3000')
})

