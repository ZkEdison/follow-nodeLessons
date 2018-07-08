let app = require('./app.js')
let should = require('should')

describe('app.npmtest.js', () => {
    it('shoould equal 0 when n === 0', () => {
        app(0).should.equal(0)
    })

    it('shoould equal 1 when n === 1', () => {
        app(1).should.equal(1)
    })
    
    it('should equal 55 when n === 10', () => {
        app(10).should.equal(55)
    })

    it('should throw when n > 10', () => {
        (() => app(11)).should.throw('n should <= 10')
    })

    it('should throw when n isnt Number', () => {
        (() => app('ab')).should.throw('n should be a Number')
    })

    it('should throw when n < 0', () => {
        (() => app(-1)).should.throw('n should >= 0')
    })
})

