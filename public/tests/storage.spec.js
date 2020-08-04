'use strict'
exports.__esModule = true
var storage_1 = require('../js/storage')
var fake_storage_factory = function() {
  return {
    dictionary: { key: '' },
    set: function(obj, callback) {
      this.dictionary = obj
      callback()
    },
    get: function(key, callback) {
      callback(this.dictionary)
    }
  }
}
describe('Storage', function() {
  test('Stores an element given its key', function() {
    var fakeStorage = fake_storage_factory()
    var storage = storage_1['default'](fakeStorage)
    storage.set('key', 'value')
    expect(fakeStorage.dictionary.key).toBe('value')
  })
  test('Calls a callback function after storing an element', function() {
    var fakeStorage = fake_storage_factory()
    var storage = storage_1['default'](fakeStorage)
    var called = false
    storage.set('key', 'value', function() {
      return (called = true)
    })
    expect(called).toBeTruthy()
  })
  test('Returns an element in a callback function given its key', function() {
    var fakeStorage = fake_storage_factory()
    var storage = storage_1['default'](fakeStorage)
    var value = ''
    storage.set('key', 'value')
    storage.get('key', function(response) {
      return (value = response)
    })
    expect(value).toBe('value')
  })
})
