export default function Status(element) {
  const TIME_MESSAGE_IS_VISIBLE = 0 // temp

  function notifyUpdate() {
    showUpdateMessage()
    setTimeout(hide, TIME_MESSAGE_IS_VISIBLE);
  }

  function showUpdateMessage() {
    render('options saved...')
  }

  function hide() {
    render('')
  }

  function render(message) {
    element.textContent = message;
  }

  return {
    notifyUpdate
  }
}
