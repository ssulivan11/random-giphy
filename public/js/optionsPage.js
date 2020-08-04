'use strict'
exports.__esModule = true
// @ts-nocheck
var status_1 = require('./status')
var tag_1 = require('./tag')
var storage_1 = require('./storage')
document.addEventListener('DOMContentLoaded', function() {
  var storage = storage_1['default'](chrome.storage.sync)
  var tag = tag_1['default'](getElement('tag'))
  var status = status_1['default'](getElement('status'))
  var resetButton = ResetButton(getElement('reset'))
  var saveButton = SaveButton(getElement('save'))
  var saveForm = SaveForm(getElement('form'))
  var save = function() {
    return storage.set(tag.name, tag.getValue(), status.notifyUpdate)
  }
  var reset = function() {
    return storage.set('', tag.changeTo(''), status.notifyUpdate)
  }
  var restore = function() {
    return storage.get(tag.name, function(value) {
      return tag.changeTo(value)
    })
  }
  restore()
  resetButton.onClick(reset)
  saveButton.onClick(save)
  saveForm.onSubmit(save)
})
var ResetButton = function(button) {
  var onClick = function(callback) {
    return button.addEventListener('click', callback)
  }
  return { onClick: onClick }
}
var SaveButton = function(button) {
  var onClick = function(callback) {
    return button.addEventListener('click', callback)
  }
  return { onClick: onClick }
}
var SaveForm = function(form) {
  var onSubmit = function(callback) {
    return form.addEventListener('submit', callback)
  }
  return { onSubmit: onSubmit }
}
var getElement = function(name) {
  return document.getElementById(document, name)
}
