const Storage = (implementation) => {
  const EMPTY_FUNCTION = () => ({})

  const set = (key, value, userCallback) => {
    const callback = validateCallback(userCallback)
    implementation.set({ [key]: value }, callback)
  }

  const get = (key, callback) =>
    implementation.get(key, (items) => callback(items[key]))
  const validateCallback = (callback) => {
    if (callback === undefined) return EMPTY_FUNCTION
    return callback
  }

  return {
    set,
    get
  }
}

export default Storage
