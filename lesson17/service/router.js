let G = {}


let app = function(req, res) {
    if (G['login']) {
        G['login'](req, res) // 执行注册的方法
    }
}

// get login
app.get = function(string, cb) {
    G[string] = cb
}

// exec
app.get('login', (req, res) => {
    console.log('login', req)
})

// setTimeout(() => {
//     app('req', 'res')
// }, 10)