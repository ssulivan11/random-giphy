import Status from './status'
import Tag from './tag'
import Storage from './storage'

document.addEventListener('DOMContentLoaded', () => {
  const storage = Storage(chrome.storage.sync)
  const tag = Tag(document.getElementById('tag'))
  const status = Status(document.getElementById('status'))

  // restore
  const restore = () =>
    storage.get(tag.name, (value: string) => tag.changeTo(value))
  restore()
  // reset
  const resetButton = ResetButton(document.getElementById('reset'))
  const reset = () => storage.set('', tag.changeTo(''), status.notifyUpdate)
  resetButton.onClick(reset)
  // save
  const saveButton = SaveButton(document.getElementById('save'))
  const saveForm = SaveForm(document.getElementById('form'))
  const save = () => storage.set(tag.name, tag.getValue(), status.notifyUpdate)
  saveButton.onClick(save)
  saveForm.onSubmit(save)
})

const ResetButton = (button: HTMLElement) => {
  const onClick = (callback: EventListenerOrEventListenerObject) =>
    button.addEventListener('click', callback)
  return { onClick }
}

const SaveButton = (button: HTMLElement) => {
  const onClick = (callback: EventListenerOrEventListenerObject) =>
    button.addEventListener('click', callback)
  return { onClick }
}

const SaveForm = (form: HTMLElement) => {
  const onSubmit = (callback: EventListenerOrEventListenerObject) =>
    form.addEventListener('submit', callback)
  return { onSubmit }
}
