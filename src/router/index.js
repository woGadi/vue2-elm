import Vue from 'vue'
import VueRouter from 'vue-router'

import Page from '@/views/Page/Page.vue'
import Home from '@/views/Home/Home.vue'
import Order from '@/views/Order/Order.vue'
import User from '@/views/User/User.vue'
import Category from '@/views/Category/Category.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '',
    component: Page,
    children: [
      { path: '', redirect: 'home' },
      { path: 'home', component: Home },
      { path: 'order', component: Order },
      { path: 'user', component: User }
    ]
  },
  { path: '/category', component: Category },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 登录页面无需鉴权，直接放行
  if (to.path === '/login' || to.path === '/register' || to.path === '/home' || to.path === '/category' || to.path === '/user') return next()
  // 访问时无 token，证明未登录，跳回登录页登录
  const tokenStr = sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  // 已登录则正常访问
  next()
})

export default router
