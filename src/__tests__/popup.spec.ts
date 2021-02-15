import { formatURL, displayGif, extractGif, copyToClipboard } from '../popup'

describe('Popup helper function formatURL', () => {
  test('should return default tags', () => {
    document.body.innerHTML = `<div><span id="status" /></div>`
    const definedTag = formatURL()
    const searchedTag = definedTag.split('tag=')[1]
    expect(
      searchedTag === 'animals' ||
        searchedTag === 'fail' ||
        searchedTag === 'funny' ||
        searchedTag === 'puppies' ||
        searchedTag === 'kittens' ||
        searchedTag === 'gaming' ||
        searchedTag === 'celebrate' ||
        searchedTag === 'reactions' ||
        searchedTag === 'dance' ||
        searchedTag === 'memes' ||
        searchedTag === 'dogs' ||
        searchedTag === 'wow' ||
        searchedTag === 'backflip' ||
        searchedTag === 'ok'
    ).toBe(true)

    expect(definedTag).toMatch(
      'https://tbdsa3t4af.execute-api.us-east-2.amazonaws.com/v1/ramon?tag='
    )
  })

  test('should return custom tags when provided ', () => {
    document.body.innerHTML = `<div><span id="status" /></div>`
    const customTags = 'One,Two,Three'
    const definedTag = formatURL(customTags)
    const searchedTag = definedTag.split('tag=')[1]

    expect(
      searchedTag === 'One' || searchedTag === 'Two' || searchedTag === 'Three'
    ).toBe(true)

    expect(definedTag).toMatch(
      'https://tbdsa3t4af.execute-api.us-east-2.amazonaws.com/v1/ramon?tag='
    )
  })
})

describe('Popup helper function displayGif', () => {
  test('should populate new gif ', () => {
    document.body.innerHTML = `<div><span id="complete" /><span id="loading" /><button id="refresh-button" /><input id="input-giphy" /><input id="input-url" /><input id="input-markdown" /><div id="sub-title" /><div id="title" /><span id="image-result" /></div>`
    const gifData = displayGif()
    document.getElementById('refresh-button').click()
    expect(gifData).toEqual({
      bitly_url: '',
      image_url: '',
      images: { downsized_large: { height: 0, url: '', width: 0 } },
      title: ''
    })
  })
})

describe('Popup helper function extractGif', () => {
  test('should return Error when invalid data', () => {
    document.body.innerHTML = `<div></div>`
    const extractGifNoData = extractGif({})
    expect(extractGifNoData.toString()).toBe(
      'Error: Sorry, no response from Giphy!'
    )
  })

  test('should set loading and then return new data', () => {
    document.body.innerHTML = `<div><span id="complete" /><span id="loading" /><button id="refresh-button" /><input id="input-giphy" /><input id="input-url" /><input id="input-markdown" /><div id="sub-title" /><div id="title" /><span id="image-result" /></div>`
    const validGifObj = { image_url: 'testImage.png' }
    const extractGifData = extractGif(validGifObj)
    expect(extractGifData).toEqual(validGifObj)
  })
})

describe('Popup helper function copyToClipboard', () => {
  test('should return false if no data provided', () => {
    const extractGifData = copyToClipboard({})
    expect(extractGifData).toBe(false)
  })

  test('should copyToClipboard if all valid', () => {
    document.body.innerHTML = `<div><span id="complete" /><span id="loading" /><button id="refresh-button" /><input id="input-giphy" /><input id="input-url" /><input id="input-markdown" /><div id="sub-title" /><div id="title" /><span id="image-result" /></div>`
    document.execCommand = jest.fn()
    const extractGifData = copyToClipboard()
    expect(extractGifData).toBe(true)
  })
})
