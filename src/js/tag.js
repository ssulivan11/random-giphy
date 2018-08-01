export default function Tag(html) {
  const name = 'tag'
  let value = ''
  html.addEventListener('keyup', event => changeTo(event.target.value));

  function changeTo(newValue) {
    updateValue(newValue)
    render()
  }

  function getValue() {
    return value
  }

  function updateValue(newValue) {
    value = newValue
  }

  function render() {
    html.value = value
  }

  return {
    name,
    changeTo,
    getValue
  }
}