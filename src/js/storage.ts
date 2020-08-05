const Storage = (implementation) => {
  const set = (key, value, userCallback) => {
    const callback = validateCallback(userCallback)
    implementation.set({ [key]: value }, callback)
  }

  const get = (key: string, callback) =>
    implementation.get(key, (items) => callback(items[key]))
  const validateCallback = (callback: string) => {
    if (!callback) return () => ({})
    return callback
  }

  return {
    set,
    get
  }
}

export default Storage
