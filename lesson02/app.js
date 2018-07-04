var express = require('express')
var utility = require('utility')

var app = express()

app.get('/', (req, res) => {
    let {q} = req.query
    console.log(utility)
    let md5Value = utility.md5(q)
    res.send(md5Value)
})

app.listen(3000, (req, res) => {
    console.log('app is running port 3000')
})