'use strict'
exports.__esModule = true
var Status = function(element) {
  var TIME_MESSAGE_IS_VISIBLE = 750 // temp
  var notifyUpdate = function() {
    showUpdateMessage()
    setTimeout(hide, TIME_MESSAGE_IS_VISIBLE)
  }
  var showUpdateMessage = function() {
    return render('Options saved...')
  }
  var hide = function() {
    return render('')
  }
  var render = function(message) {
    return (element.textContent = message)
  }
  return {
    notifyUpdate: notifyUpdate
  }
}
exports['default'] = Status
