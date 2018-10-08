const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db.js')

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('static'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})


app.post('/doLogin', (req, res) => {
    console.log(req.body)
})

app.listen(3000, () => {
    console.log('listening on port 3000!')
})