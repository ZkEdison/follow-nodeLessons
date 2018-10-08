const fs = require('fs')
module.exports = function (extname) {
    let data = fs.readFileSync('./mime.json')
    let mime = JSON.parse(data.toString())
    return mime[extname] || 'text/html'
}
