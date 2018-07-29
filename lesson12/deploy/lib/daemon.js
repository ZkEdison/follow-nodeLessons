const cp = require('child_process')

let worker

let spawn = (server, config) => {
    worker = cp.spawn('node', [server, config])

    worker.on('exit', (code) => {
        if (code !== 0) {
            spawn(server, config)
        }
    })
}

let main = (argv) => {
    spawn('server.js', argv[0])

    process.on('SIGALRM', () => {
        worker.kill()
        process.exit(0)
    })
}

main(process.argv.slice(2))