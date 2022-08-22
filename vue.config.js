const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require('path')
// 注意：这里的路径用 @/ 会报错
const themePath = path.join(__dirname, './src/style/theme.less')

module.exports = {
  // devServer: {
  //   watchOptions: {
  //     // ignored: ['**/.#*.vue', 'node_modules/**']
  //     ignored: /node_modules/
  //   }
  // },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 将 theme.less 导入使用，我们只需修改 less 里的样式即可；而 less 不属于配置文件，不直接修改 config 文件，所以无需重启项目，即可生效。
            hack: `true; @import "${themePath}";`
          }
        }
      }
    }
  }
}
