const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer((req, res) => {
    let html = fs.readFileSync('test.html', 'utf8')
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(html)
}).listen(8080, () => {
    console.log('listen at 8080')
})