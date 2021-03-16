module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/first': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    camelcase: 'off',
  },
};
