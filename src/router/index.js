import Vue from 'vue'
import VueRouter from 'vue-router'

import Page from '@/views/Page/Page.vue'
import Home from '@/views/Home/Home.vue'
import Order from '@/views/Order/Order.vue'
import Category from '@/views/Category/Category.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '',
    component: Page,
    children: [
      { path: '', redirect: 'home' },
      { path: 'home', component: Home },
      { path: 'order', component: Order }
    ]
  },
  { path: '/category', component: Category }
]

const router = new VueRouter({
  routes
})

export default router
