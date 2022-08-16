import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 vant 组件
import '@/plugins/vant.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
