'use strict'
exports.__esModule = true
var tag_1 = require('../js/tag')
var test_element_factory = function(value) {
  if (value === void 0) {
    value = ''
  }
  return {
    value: value,
    addEventListener: function() {}
  }
}
describe('Tag', function() {
  test('Name property tells the component name', function() {
    var test_element = test_element_factory()
    var tag = tag_1['default'](test_element)
    expect(tag.name).toBe('tag')
  })
  test('value can be asked through getValue', function() {
    var test_element = test_element_factory('funny')
    var tag = tag_1['default'](test_element)
    expect(tag.getValue()).toBe('funny')
  })
  test('default value is empty string', function() {
    var test_element = test_element_factory()
    var tag = tag_1['default'](test_element)
    expect(tag.getValue()).toBe('')
  })
  test('can change the value through cahngeTo', function() {
    var test_element = test_element_factory()
    var tag = tag_1['default'](test_element)
    var newTag = 'newTag'
    tag.changeTo(newTag)
    expect(tag.getValue()).toBe(newTag)
    expect(test_element.value).toBe(newTag)
  })
})
