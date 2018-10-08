const fs = require('fs')

var readStream = fs.createReadStream('./file.text')
var str = ''
readStream.on('data', (chunk) => {
    console.log(chunk)
    str += chunk
})
readStream.once('data', () => {
    console.log('开始')
})

readStream.on('end', () => {
    console.log('读取完成')
    console.log(str)
})

readStream.on('error', (err) => {
    console.log(err)
})