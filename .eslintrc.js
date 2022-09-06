module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'space-before-function-paren': ['warn', 'never'],
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'ignore',
        named: 'ignore',
        asyncArrow: 'ignore'
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['Home', 'Header', 'Footer', 'Search', 'Page', 'Category', 'Order', 'Login', 'Code', 'Register', 'User']
      }
    ],
    // 问题：如何忽略标签自闭合检测？
    // 解决：配置以下代码，同时要在 Setting 搜索并取消勾选 Vetur>Validation:Template，以更好的解决此问题。
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    // 忽略 eslint 建议使用 const
    'prefer-const': 'off'
    /* 'prefer-const': [
      'warn',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ] */
  }
}
