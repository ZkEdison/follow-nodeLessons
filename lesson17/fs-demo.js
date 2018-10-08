const fs = require('fs')

// 异步删除
// fs.unlink('file.text', (err) => {
//     if (err) throw err
//     console.log('sucessfully deleted ./file.text')
// })

// Current Work Directory
console.log(process.cwd())
// try {
//     fs.unlinkSync(file.text)
// } catch (err) {
//     //
// }


// relative path on POSIX(relative to process.cwd())
// 相对于 process.cwd 目录， node 命令行 所在目录
fs.open('file.text', 'r', (err, fd) => {
    if (err) throw err
    fs.close(fd, (err) => {
        if (err) throw err
    })
})