const Status = (element: {
  textContent: string
}): { notifyUpdate: () => void } => {
  const TIME_MESSAGE_IS_VISIBLE = 750 // temp

  const notifyUpdate = () => {
    showUpdateMessage()
    setTimeout(hide, TIME_MESSAGE_IS_VISIBLE)
  }
  const showUpdateMessage = () => render('Options saved...')
  const hide = () => render('')
  const render = (message) => (element.textContent = message)

  return {
    notifyUpdate
  }
}

export default Status
