const Tag = (html) => {
  const name = 'tag'
  let value = html.value
  html.addEventListener('keyup', (event) => changeTo(event.target.value))

  const changeTo = (newValue) => {
    updateValue(newValue)
    render()
  }
  const getValue = () => value
  const updateValue = (newValue) => (value = newValue)
  const render = () => (html.value = value)

  return {
    name,
    changeTo,
    getValue
  }
}

export default Tag
