let tags = ''

interface DownSizedLarge {
  width: number
  height: number
  url: string
}

interface Images {
  downsized_large: DownSizedLarge
}

interface Data {
  title: string
  bitly_url: string
  image_url: string
  images: Images
}

const defaultData = {
  title: '',
  bitly_url: '',
  image_url: '',
  images: {
    downsized_large: {
      width: 0,
      height: 0,
      url: ''
    }
  }
}

const randomGif = (): void => {
  getTag()
    .then(formatURL)
    .then(fetchURL)
    .then(parseJSON)
    .then(extractGif)
    .then(displayGif)
    .then(copyToClipboard)
    .catch(displayError)
}

const getTag = (): Promise<string> =>
  new Promise((resolve: (value?: string) => void) => {
    chrome.storage.sync.get('tag', (items) => resolve(items.tag || null))
  })

const formatURL = (tag?: string): string => {
  const selectTags = (tag && tag.split(',')) || [
    'animals',
    'fail',
    'funny',
    'puppies',
    'kittens',
    'gaming',
    'celebrate',
    'reactions',
    'dance',
    'memes',
    'dogs',
    'wow',
    'backflip',
    'ok'
  ]
  tags = selectTags[Math.floor(Math.random() * selectTags.length)]

  renderContent('status', `finding you a gif for:<br /><h3>${tags}</h3>`)
  return `https://tbdsa3t4af.execute-api.us-east-2.amazonaws.com/v1/ramon?tag=${tags}`
}

const fetchURL = (url: string): Promise<Response> => fetch(url)
const parseJSON = (response: Body): Promise<Response> => response.json()

const extractGif = (data) => {
  if (!data || !data.image_url) return Error('Sorry, no response from Giphy!')
  setLoading(true)
  return data
}

const displayGif = (data: Data = defaultData) => {
  const gifContainer = document.getElementById(
    'image-result'
  ) as HTMLImageElement
  gifContainer.width = data.images.downsized_large.width
  gifContainer.height = data.images.downsized_large.height
  gifContainer.src = data.images.downsized_large.url
  gifContainer.hidden = false
  setLoading(false)
  renderContent('title', data.title)
  renderContent('sub-title', `from: ${tags}`)
  renderInputContent('input-url', data.images.downsized_large.url)
  renderInputContent('input-giphy', data.bitly_url)
  renderInputContent(
    'input-markdown',
    `![](${data.images.downsized_large.url})`
  )
  const getNewGif = () => {
    setLoading(true)
    randomGif()
    document
      .getElementById('refresh-button')
      .removeEventListener('click', getNewGif, false)
  }
  document
    .getElementById('refresh-button')
    .addEventListener('click', getNewGif, false)
  return data
}

const copyToClipboard = (data: Data = defaultData): boolean => {
  if (!data?.images?.downsized_large) return false
  const disposable = document.createElement('input')
  disposable.setAttribute('id', 'disposable_id')
  document.body.appendChild(disposable)
  const disposableIdInput = document.getElementById(
    'disposable_id'
  ) as HTMLInputElement
  disposableIdInput.value = `![](${data?.images.downsized_large.url})`
  disposable.select()
  document.execCommand('copy')
  document.body.removeChild(disposable)
  return true
}

const setLoading = (isLoading: boolean): string => {
  if (isLoading) {
    document.getElementById('loading').style.display = 'block'
    return (document.getElementById('complete').style.display = 'none')
  }
  document.getElementById('loading').style.display = 'none'
  return (document.getElementById('complete').style.display = 'block')
}

const renderContent = (id: string, text: string): string =>
  (document.getElementById(id).innerHTML = text)

const renderInputContent = (id: string, text: string): string => {
  const defaultId = document.getElementById(id) as HTMLInputElement
  return (defaultId.defaultValue = text)
}

const displayError = (message: string): string =>
  renderContent(
    'status',
    `Sorry, cannot display a gif at the moment. ${message}`
  )

document.addEventListener('DOMContentLoaded', randomGif)

module.exports = {
  randomGif,
  getTag,
  formatURL,
  extractGif,
  displayGif,
  copyToClipboard,
  setLoading
}
