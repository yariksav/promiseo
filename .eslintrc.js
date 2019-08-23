module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'jest/globals': true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'standard'
  ],
  plugins: [
    'jest'
  ],
  rules: {
    // 'jest': 2,
    'ident': 'off',
    'no-debugger': 'off',
    'no-console': 'off',
    'no-useless-escape': 'off'
  },
  globals: {}
}
