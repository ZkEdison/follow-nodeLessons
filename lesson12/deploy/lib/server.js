const fs = require('fs')
const path = require('path')
const http = require('http')

let MIME = {
    '.css': 'text/css',
    '.js' : 'application/javascript'
}

let combineFiles = (pathnames, callback) => {
    let output = []
    console.log(pathnames)
    let next = (i, len) => {
        console.log(`next${i}, i => ${i}, len => ${len}`)
        if (i < len) {
            fs.readFile(pathnames[i], (err, data) => {
                if (err) {
                    callback(err)
                } else {
                    output.push(data)
                    next(i + 1, len)
                    
                }
            })
        } else {
            callback(null, Buffer.concat(output)) // 第一个值不为err
        }
    }
    next(0, pathnames.length)
}

let parseURL = (root, url) => {
    let base, pathnames, parts
    console.log(`parseURL(${root}, ${url})`)
    if (url.indexOf('??') === -1) { // 如果不存在
        url = url.replace('/', '/??')
    }

    parts = url.split('??')
    base = parts[0]
    pathnames = parts[1].split(',').map(value => path.join(root, base, value)) //?文件路径
    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain', // 怎么只取第一个
        pathnames: pathnames
    }
}



let main = (argv) => {
    let config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')) // 读取配置文件
    let root = config.root || '.'
    let port = config.port || 80
    console.log(config)
    let server = http.createServer((req, res) => {
        let urlInfo = parseURL(root, req.url) //?
        console.log(`urlInfo => ${JSON.stringify(urlInfo)}`)
        combineFiles(urlInfo.pathnames, (err, data) => {
            if (err) {
                res.writeHead(404)
                res.end(err.message)
            } else {
                res.writeHead(200, {
                    'Content-Type': urlInfo.mime
                })
                res.end(data)
            }
        })
    }).listen(port, () => {
        console.log(`listen at port: ${port}`)
    })

    process.on('SIGALRM', () => {
        server.close(() => {
            process.exit()
        })
    })
}


main(process.argv.slice(2))
