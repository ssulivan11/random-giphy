const Storage = (implenetation) => {
  const EMPTY_FUNCTION = () => {}

  const set = (key, value, userCallback) => {
    const callback = validateCallback(userCallback)
    implenetation.set({ [key]: value }, callback)
  }

  const get = (key, callback) =>
    implenetation.get(key, (items) => callback(items[key]))
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
