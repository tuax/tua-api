module.exports = {
  extends: 'standard',
  parserOptions: {
    ecmaVersion: 10,
    parser: 'babel-eslint',
  },
  rules: {
    'promise/param-names': 0,
    'template-curly-spacing': 'off',
    'comma-dangle': [2, 'always-multiline'],
  },
  globals: {
    wx: true,
    FormData: true,
  },
}
