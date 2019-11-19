module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'semi': ["warn", "never"],
    'quotes': ["warn", "double"],
    'eol-last': ["off", "never"],
    'no-console': ["off", "never"],
    'arrow-parens': ["off", "never"],
    'brace-style': ["off", "never"],
  }
}
