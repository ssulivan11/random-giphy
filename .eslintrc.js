module.exports = {
  extends: 'standard',
  env: {
    jest: true
  },
  plugins: ['prettier', 'jest'],
  globals: {
    fetch: true,
    chrome: true,
    error: true
  },
  rules: {
    camelcase: 0,
    semi: 0,
    'space-before-function-paren': 0
  }
}
