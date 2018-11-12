// console.log(Buffer.allocUnsafe(5, 1));
/**
 * Buffer
 * Buffer.byteLength
 * Buffer.isBuffer()
 * Buffer.concat()
 */

console.log(Buffer.byteLength('test')) // 4
console.log(Buffer.byteLength('二次')) // 6

console.log(Buffer.isBuffer({})) // false
console.log(Buffer.isBuffer(Buffer.from([1, 2, 3]))) // true


const buf1 = Buffer.from('This ')
const buf2 = Buffer.from('is ')
const buf3 = Buffer.from('a ')
const buf4 = Buffer.from('tset ')
const buf5 = Buffer.from('!')
const buf = Buffer.concat([buf1, buf2, buf3, buf4, buf5])
console.log(buf, buf.toString()) // This is a tset !

 


/**
 * buf: Buffer
 * buf.length
 * buf.toString()
 * buf.fill()
 * buf.indexOf()
 * buf.copy()
 */

// 解决中文乱码
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder('utf8')


const bufcopy = Buffer.from('中文字符串~')
console.log(bufcopy)
for (let i = 0; i < bufcopy.length; i += 5) {
    const b = Buffer.allocUnsafe(5);
    bufcopy.copy(b, 0, i)
    console.log(b)
    console.log(b.toString())

    setTimeout(() => {
        console.log(decoder.write(b))
    }, 17)
}



const fs = require('fs')

const rs = fs.createReadStream('./01_bufferinit.js')

rs.pipe(process.stdout)