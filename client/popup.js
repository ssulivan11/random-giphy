document.addEventListener('DOMContentLoaded', randomGif)

function randomGif() {
  getTag()
    .then(formatURL)
    .then(fetchURL)
    .then(parseJSON)
    .then(extractGif)
    .then(displayGif)
    .then(copyToClipboard)
    .catch(displayError)
}

function getTag() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('tag', items => resolve(items.tag || null))
  })
}

function formatURL(tag) {
  const selectTags = tag && tag.split(",") || [
    "animals",
    "fail",
    "funny",
    "puppies",
    "kittens",
    "gaming",
    "celebrate",
    "reactions",
    "dance",
    "memes",
    "dogs",
    "wow",
    "england",
    "backflip",
    "ok"
  ]
  const tags = selectTags[Math.floor(Math.random() * selectTags.length)]

  renderStatus(`performing search in giphy for ${tags}...`)
  return `https://tbdsa3t4af.execute-api.us-east-2.amazonaws.com/v1/ramon?tag=${tags}`
}

function fetchURL(url) {
  return fetch(url)
}

function parseJSON(response) {
  return response.json()
}

function extractGif(data) {
  if (!data || !data.image_url) return error('No response from Giphy!')

  let url = data.image_url
  let width = parseInt(data.image_width)
  let height = parseInt(data.image_height)

  return { url, width, height }
}

function displayGif(gif) {
  let gifContainer = document.getElementById('image-result')
  console.warn(gif)
  gifContainer.width = gif.width
  gifContainer.height = gif.height
  gifContainer.src = gif.url
  gifContainer.hidden = false
  renderStatus('')

  return gif
}

function copyToClipboard(gif) {
  let disposable = document.createElement('input')
  disposable.setAttribute('id', 'disposable_id')

  document.body.appendChild(disposable);
  document.getElementById('disposable_id').value = `![](${gif.url})`

  disposable.select();

  document.execCommand('copy');

  document.body.removeChild(disposable);
}

function renderStatus(text) {
  document.getElementById('status').textContent = text
}

function displayError(message) {
  renderStatus(`Cannot display image. ${message}`)
}
