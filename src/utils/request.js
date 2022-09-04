import axios from 'axios'

// 判断是否为生产环境
// const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

// 请求根路径
export const request = axios.create({
  // withCredentials: true, // 请求携带cookie
  // 根据环境切换请求根路径
  // baseURL: IS_PROD ? 'https://elm.cangdu.org' : '/api'
  // baseURL: '/api'
  // baseURL: 'https://elm.cangdu.org'
  baseURL: 'https://mock.apifox.cn/m1/1516072-0-default'
})
