let assert = require('assert')
let listcompose = require('../build/listcompose.js')

describe('module', function() {
    it('exists', function() {
        assert(typeof listcompose === 'function')
    })
    it('returns functions', function() {
        let functions = [
            x => 'a' + x
        ]
        let composed = listcompose(functions)
        assert(typeof composed === 'function')
    })
    it('composes functions', function() {
        let functions = [
            x => 'a' + x,
            x => 'b' + x,
            x => 'c' + x
        ]
        let composed = listcompose(functions)
        assert.equal(composed('!'), 'cba!')
    })
    it('applies callbacks', function() {
        let functions = [
            x => 'a' + x,
            x => 'c' + x,
        ]
        let callback = x => 'b' + x
        let composed = listcompose(functions, callback)
        assert.equal(composed('!'), 'bcba!')
    })
    it('passes index to callbacks', function() {
        let functions = [
            x => 'a' + x,
        ]
        listcompose(functions, function(current, index) {
            assert(index === 1)
        })
    })
})
