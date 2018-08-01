import Status from './status'
import Tag from './tag'
import Storage from './storage'

document.addEventListener('DOMContentLoaded', () => {
  const storage = Storage(chrome.storage.sync)
  const tag = Tag(getElement('tag'))
  const status = Status(getElement('status'))
  const resetButton = ResetButton(getElement('reset'))
  const saveButton = SaveButton(getElement('save'))
  const saveForm = SaveForm(getElement('form'))

  restore()
  resetButton.onClick(reset);
  saveButton.onClick(save);
  saveForm.onSubmit(save);

  function save() {
    storage.set(tag.name, tag.getValue(), status.notifyUpdate)
  }

  function reset() {
    storage.set('', tag.changeTo(''), status.notifyUpdate)
  }

  function restore() {
    storage.get(tag.name, value => tag.changeTo(value))
  }
});

function ResetButton(button) {
  function onClick(callback) {
    button.addEventListener('click', callback);
  }
  return { onClick }
}

function SaveButton(button) {
  function onClick(callback) {
    button.addEventListener('click', callback);
  }
  return { onClick }
}

function SaveForm(form) {
  function onSubmit(callback) {
    form.addEventListener('submit', callback);
  }
  return { onSubmit }
}

function getElement(name) {
  return document.getElementById.call(document, name)
}
