let tags = ''

const randomGif = () => {
  getTag()
    .then(formatURL)
    .then(fetchURL)
    .then(parseJSON)
    .then(extractGif)
    .then(displayGif)
    .then(copyToClipboard)
    .catch(displayError)
}

const getTag = () => new Promise((resolve) => {
  chrome.storage.sync.get('tag', items => resolve(items.tag || null))
})

const formatURL = (tag) => {
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
    "backflip",
    "ok"
  ]
  tags = selectTags[Math.floor(Math.random() * selectTags.length)]

  renderContent('status', `performing search in giphy for ${tags}...`)
  return `https://tbdsa3t4af.execute-api.us-east-2.amazonaws.com/v1/ramon?tag=${tags}`
}

const fetchURL = (url) => fetch(url)
const parseJSON = (response) => response.json()

const extractGif = (data) => {
  if (!data || !data.image_url) return error('Sorry, no response from Giphy!')
  setLoading(true)
  return data
}

const displayGif = (data = {}) => {
  let gifContainer = document.getElementById('image-result')
  gifContainer.width = data.images.downsized_large.width
  gifContainer.height = data.images.downsized_large.height
  gifContainer.src = data.images.downsized_large.url
  gifContainer.hidden = false
  setLoading(false)
  renderContent('title', data.title)
  renderContent('sub-title', `from: ${tags}`)
  renderInputContent('input-url', data.images.downsized_large.url)
  renderInputContent('input-giphy', data.bitly_url)
  renderInputContent('input-markdown', `![](${data.images.downsized_large.url})`)
  return data
}

const copyToClipboard = (data) => {
  let disposable = document.createElement('input')
  disposable.setAttribute('id', 'disposable_id')
  document.body.appendChild(disposable);
  document.getElementById('disposable_id').value = `![](${data.images.downsized_large.url})`
  disposable.select();
  document.execCommand('copy');
  document.body.removeChild(disposable);
}

const setLoading = (isLoading) => {
  if (isLoading) {
    document.getElementById('loading').style.display = 'block'
    document.getElementById('complete').style.display = 'none'
  } else {
    document.getElementById('loading').style.display = 'none'
    document.getElementById('complete').style.display = 'block'
  }
}

const renderContent = (id, text) => document.getElementById(id).textContent = text
const renderInputContent = (id, text) => document.getElementById(id).defaultValue = text
const displayError = (message) => renderContent('status', `Sorry, cannot display a gif at the moment. ${message}`)

document.addEventListener('DOMContentLoaded', randomGif)
