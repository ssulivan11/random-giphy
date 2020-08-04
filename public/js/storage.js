'use strict'
exports.__esModule = true
var Storage = function(implementation) {
  var EMPTY_FUNCTION = function() {
    return {}
  }
  var set = function(key, value, userCallback) {
    var _a
    var callback = validateCallback(userCallback)
    implementation.set(((_a = {}), (_a[key] = value), _a), callback)
  }
  var get = function(key, callback) {
    return implementation.get(key, function(items) {
      return callback(items[key])
    })
  }
  var validateCallback = function(callback) {
    if (callback === undefined) return EMPTY_FUNCTION
    return callback
  }
  return {
    set: set,
    get: get
  }
}
exports['default'] = Storage
