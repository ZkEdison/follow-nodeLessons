var express = require('express')
var path = require('path')
var fs = require('fs')
var morgan = require('morgan')

var app = express()

app.use(morgan('combined'))

/**
 * static file
 */
// app.use((req, res, next) => {
//     let filePath = path.join(__dirname, "static", req.url)
//     console.log(filePath)
//     fs.exists(filePath, (exists) => {
//         if (exists) {
//             res.sendFile(filePath)
//         } else {
//             next()
//         }
//     })
// })
app.use(express.static(path.join(__dirname, 'static')))

app.use('/api', (req, res, next) => {
    res.send(req.route)
})

app.use((req, res) => {
    res.status(404)
    res.send("File not found!")
})


app.listen(3000, () => {
    console.log("App started on port 3000")
})