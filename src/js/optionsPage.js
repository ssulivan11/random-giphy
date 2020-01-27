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

  const save = () => storage.set(tag.name, tag.getValue(), status.notifyUpdate)
  const reset = () => storage.set('', tag.changeTo(''), status.notifyUpdate)
  const restore = () => storage.get(tag.name, value => tag.changeTo(value))
});

const ResetButton = (button) => {
  const onClick = (callback) => button.addEventListener('click', callback)
  return { onClick }
}

const SaveButton = (button) => {
  const onClick = (callback) => button.addEventListener('click', callback);
  return { onClick }
}

const SaveForm = (form) => {
  const onSubmit = (callback) => form.addEventListener('submit', callback);
  return { onSubmit }
}

const getElement = (name) => document.getElementById.call(document, name)
