const mongoose = require('mongoose')

mongoose.connect('mongodb://47.75.213.227:27017/test', {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', (e) => {
    console.log(e)
    console.log('connect----error')
})

db.on('open', () => {
    console.log('connect----success')
})

module.exports = db