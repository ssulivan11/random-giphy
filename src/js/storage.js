export default function Storage(implenetation) {
  const EMPTY_FUNCTION = () => {}

  function set(key, value, userCallback) {
    const callback = validateCallback(userCallback)

    implenetation.set({ [key]: value }, callback)
  }

  function get(key, callback) {
    implenetation.get(key, items => callback(items[key]))
  }

  function validateCallback(callback) {
    if (callback == undefined) return EMPTY_FUNCTION

    return callback
  }

  return {
    set,
    get
  }
}
