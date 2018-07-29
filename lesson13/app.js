var express = require('express')
var port = process.env.PORT || 3000
var path = require('path')
var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'bower_components')))

app.listen(port, () => {
    console.log(`listen at ${port}`)
})

// index page
app.get('/', (req, res) => {
    res.render('index', {
        title: '首页',
        movies: [{
            title: '机械战警',
            _id:"1",
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },
        {
            title: '机械战警',
            _id:"1",
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },
        {
            title: '机械战警',
            _id:"1",
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },
        {
            title: '机械战警',
            _id:"1",
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        }]
    })
})

// detail page
app.get('/detail/:id', (req, res) => {
    res.render('detail', {
        title: '详情页'
    })
})

// admin page
app.get('/admin', (req, res) => {
    res.render('admin', {
        title: '后台录入'
    })
})

// list page
app.get('/admin/list', (req, res) => {
    res.render('list', {
        title: '列表'
    })
})
