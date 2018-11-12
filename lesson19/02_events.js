const EventEmitter = require('events')

class CustomEvent extends EventEmitter {

}

const ce = new CustomEvent()

ce.on('test', function() {
    console.log('this is a test', this)
})

// setInterval(() => {
//     ce.emit('test')

// }, 400)

// ce.removeListener('test'0)