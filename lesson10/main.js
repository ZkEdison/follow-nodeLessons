// 小文件拷贝
const fs = require('fs')

let copy = (src, dst) => {
    fs.writeFileSync(dst,fs.readFileSync(src))
}



// 大文件拷贝

let copyBig = (src, dst) => {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}



// 执行
let main = (argv) => {
    copyBig(argv[0], argv[1])
}

// process 是一个全局变量， 可以通过 proces.argv 来获得命令行参数
// argv[0] 固定等于 NodeJS 执行程序的绝对路径
// argv[1] 固定等于主模块的绝对路径， 
// 因此第一个命令行参数从 argv[2] 这个位置开始

main(process.argv.slice(2))