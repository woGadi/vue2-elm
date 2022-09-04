const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require('path')
// 注意：这里的路径用 @/ 会报错
const themePath = path.join(__dirname, './src/style/theme.less')
// let cookie = ''
module.exports = {
  // 用于保存第一次登陆成功服务端下发的cookie，从代理服务器 proxyRes.headers['set-cookie'] 取出
  devServer: {
    //   // // <-- 配置 webSocket 报错的
    host: '127.0.0.1',
    port: 8081
    //   // client: {
    //   //   webSocketURL: 'ws://127.0.0.1:8081/ws'
    //   //   // webSocketURL: 'ws://0.0.0.0:3000/ws'
    //   // }
    //   // // <-- 配置 webSocket 报错的
    //   //   // port: 9000,
    //   //   // open: false,
    //   //   // overlay: {
    //   //   //   warnings: false,
    //   //   //   errors: true
    //   //   // },
    //   //   proxy: {
    //   //     '/api': {
    //   //       // ‘/api' 对应axios的baseUrl字段
    //   //       target: 'https://mock.apifox.cn/m1/1516072-0-default', // 目标服务器地址
    //   //       secure: true,
    //   //       ws: true, // 允许websocket代理
    //   //       changeOrigin: true, // 是否改变域名 (是否允许跨域)
    //   //       pathRewrite: {
    //   //         // 路径重写
    //   //         '^/api': '' // 实际接口是'https://elm.cangdu.org/login'， axios发出的是‘/api/login’，被代理服务器捕获，同时路径重写删除‘^/api’成‘/login’，转发到目标服务器
    //   //       }
    //   //       /* onProxyReq(proxyReq, req, res) {
    //   //         // 1.第一次请求/login接口，没有cookie
    //   //         // 3.第二次请求，cookie有值，赋值给req，以后每次请求均赋值
    //   //         if (cookie) {
    //   //           proxyReq.setHeader('cookie', cookie)
    //   //         }
    //   //       },
    //   //       onProxyRes(proxyRes, req, res) {
    //   //         // 2.第一次/login请求返回携带cookie，赋值保存，也仅仅login请求返回cookie
    //   //         if (!cookie) {
    //   //           cookie = proxyRes.headers['set-cookie']
    //   //         }
    //   //         // 4.第二次请求以及之后其他接口请求的时候并不返回cookie，所以不能再赋值
    //   //       } */
    //   //     }
    //   //   }
  },

  /* devServer: { proxy: { 'https://elm.cangdu.org': { target: 'http://localhost:8081/', secure: true, changeOrigin: true, ws: true, pathRewrite: { '^': '' } } } }, */
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
