import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 vant 组件
import '@/plugins/vant.js'
// 导入移动端适配插件
import 'lib-flexible'
// 导入全局样式表
import '@/style/global.less'

import { reqInterceptorAPI } from '@/apis/authAPI.js'
reqInterceptorAPI()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
