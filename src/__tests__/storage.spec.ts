import Storage from '../js/storage'

const fake_storage_factory = () => ({
  dictionary: { key: '' },
  set(obj: string, callback: () => void) {
    this.dictionary = obj
    callback()
  },
  get(key: boolean, callback: (unknown) => void) {
    callback(this.dictionary)
  }
})

describe('Storage', () => {
  test('Stores an element given its key', () => {
    const fakeStorage = fake_storage_factory()
    const storage = Storage(fakeStorage)

    storage.set('key', 'value', () => '')

    expect(fakeStorage.dictionary.key).toBe('value')
  })

  test('Calls a callback function after storing an element', () => {
    const fakeStorage = fake_storage_factory()
    const storage = Storage(fakeStorage)
    let called = false

    storage.set('key', 'value', () => (called = true))

    expect(called).toBeTruthy()
  })

  test('Returns an element in a callback function given its key', () => {
    const fakeStorage = fake_storage_factory()
    const storage = Storage(fakeStorage)
    let value = ''

    storage.set('key', 'value', () => '')
    storage.get('key', (response: string) => (value = response))

    expect(value).toBe('value')
  })
})
