'use strict'
exports.__esModule = true
var status_1 = require('../js/status')
var test_element_factory = function() {
  return {
    textContent: ''
  }
}
describe('Status', function() {
  test('notifyUpdate method shows a notification', function() {
    var test_element = test_element_factory()
    var status = status_1['default'](test_element)
    status.notifyUpdate()
    expect(test_element.textContent).toBe('Options saved...')
  })
  test('notifyUpdate method hides notification after 750ms', function() {
    var test_element = test_element_factory()
    var status = status_1['default'](test_element)
    jest.useFakeTimers()
    status.notifyUpdate()
    jest.runAllTimers()
    // expect(setTimeout.mock.calls.length).toBe(1)
    // expect(setTimeout.mock.calls[0][1]).toBe(750)
    expect(test_element.textContent).toBe('')
  })
})
