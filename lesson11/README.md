# 《作用域与闭包： this. var. (function () {})》

## 目标

无具体目标

## 知识点

1. 理解 js 中var的作用域
2. 了解闭包的概念
3. 理解 this 的指向 

**es6中新增了 let 关键词， 与块级作用域， 相关知识参考： http://es6.ruanyifeng.com/#docs/let


### var 作用域

```js
var parent = function() {
    var name = "parent_name"
    var age = 13

    var child = function() {
        var name = "child_name"
        var childAage =0.3;
        console.log(name, age, childAge)
        // => child_name 13 0.3
    }

    child();

    // will throw Error
    // ReferenceError: childAge is not defined
    console.log(name, age, childAge)
}

parent()
```

如果忘记var, 那么 变量就被声明未全局变量了


### 闭包 
闭包这个概念， 在函数式编程里很常见， 简单的说， 就是使用内部函数可以访问定义在函数外部函数中的变量

```js
var adder = function() {
    var base = x
    return function(n) {
        return n + base
    }
}

var add10 = adder(10)
console.log(add10(5))

var add20 = adder(20)
console.log(add20(5))
```

每次调用adder 时， adder 都会返回一个函数给我们， 我们传递给adder的值， 会保存在一个名为base的变量中，由于返回的函数在其中引用了base的值， 于是base的引用计数被+1， 当返回函数不被垃圾回收时 则base 也会一直存在

#### 闭包的一个坑
```js
for（var i = 0; i < 5; i++） {
    setTimeout(function() {
        console.log(i)
    }, 5)
}
```

上面这个代码块会打印5个 '5' 出来，
之所以会这样是因为 setTimeout 中的 i 是对外层 i 的引用

为了得到我们预期的结果， 我们可以把i赋值成一个局部的变量，从而摆脱外层迭代的影响
```js
for (var i = 0; i < 5; i++) {
    (function(idex) {
        setTimeout(function() {
            console.log(idx)
        }, 5)
    })(i)
}
```

### this

在函数执行时， this总是指向调用该函数的对象。要判断this的指向， 其实就是判断this所在的函数属于谁。

在《JavaScript语言精粹》这本书中，把this出现的场景分为四类， 简单的说就是

* 有对象就指向调用对象
* 没调用对象就是指向全局对象
* 用new构造就指向新对象
* 通过 apply 或 call 或 bind 来改变this的指向

1）函数有所属对象时， 指向所属对象
函数有所属对象， 通常通过 `.`表达式调用， 这时 `this`自然指向所属对象， 比如：

```js

var myObject = {value: 100}
myObject.getValue = function() {
    console.log(this.value) //输出100
    
    console.log(this)

    return this.value
}

console.log(myObject.getValue()) // => 100
```
`getVaue()` 属于对象 `myObject`, 并由 `myObject` 进行`.`调用，因此 `this` 指向对象 `myObject`

2) 函数没有所属对象： 指向全局对象

```js
var myObject = {value: 100}

myObject.getValue = function() {
    var foo = function() {
        console.log(this.value) // => undefined
        console.log(this)
    }
    foo()
    return this.value
}
console.log(myObject.getValue())
```

在上述代码块中， `foo` 函数虽然定义在 `getValue` 函数当中，但实际上它既补属于 `getValue` 也补属于 `myObject` 。 `foo` 并没有被绑定在任何对象上， 所以当调用它时，它的`this`指针指向`global`， 据说这时一个设计错误

3） 构造器中this指向： 新对象
js中 我们通过 `new` 关键词来调用构造函数时， 此时 this 会被绑定在新对象上
```js
var SomeClass = function() {
    this.value = 100
}

var myCreate = new SomeClass()
consol.log(myCreate.value)
```

顺便说一句， 在js中， 构造函数、普通函数、对象方法、闭包， 这四种没有明确界限， 界限都在人的心中

4） apply 和 call 调用以及 bind 绑定： 指向绑定的对象
apply 方法接受两个参数， 第一个时函数运行的作用域， 另一个时一个参数数组（arguments）

call 方法第一个参数的意义和apply 相同， 知识其他的参数需要一个个列举出来
简单的来说， call 的方式更接近我们平常调用函数， 而apply 需要我们传递Array 形式的数组给它， 他们时可以相互转换的
```js
var myObject = {value: 100}

var foo = function() {
    console.log(this)
}
foo() // 全局变量 this
foo.apply(myObject) // {value: 100}
foo.call(myObject) ///{value: 100}

var newFoo = foo.bind(myObject)
newfoo() // {value: 100}
```

over~~