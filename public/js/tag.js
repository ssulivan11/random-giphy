'use strict'
exports.__esModule = true
var Tag = function(html) {
  var name = 'tag'
  var value = html.value
  html.addEventListener('keyup', function(event) {
    return changeTo(event.target.value)
  })
  var changeTo = function(newValue) {
    updateValue(newValue)
    render()
  }
  var getValue = function() {
    return value
  }
  var updateValue = function(newValue) {
    return (value = newValue)
  }
  var render = function() {
    return (html.value = value)
  }
  return {
    name: name,
    changeTo: changeTo,
    getValue: getValue
  }
}
exports['default'] = Tag
