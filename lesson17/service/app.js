const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const getMime = require('./getmime.js')
const router = require('./router.js')

console.log(router())
let server = http.createServer((req, res) => {
    let {pathname} = url.parse(req.url)
    let contentType = getMime(path.extname(pathname))
    console.log(pathname)
    if (pathname === '/') {
        pathname = '/index.html'
    }
    fs.readFile('static' + pathname, (err, data) => {
        if (!err) {
            res.writeHead(200, {'Content-Type': contentType})
            res.write(data)
            res.end()
        } else {
            console.log('不存在')
            fs.readFile('static/404.html', (err, data) => {
                if (!err) {
                    res.writeHead(404, {'Content-Type': contentType})
                    res.write(data)
                    res.end()
                } else {
                    console.log(err)
                    res.end()
                }
            })
        }
    })
})

console.log(getMime('.css'))

server.listen(8080, () => {
    console.log(`Server running at http: 8080`)
})