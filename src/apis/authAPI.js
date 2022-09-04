// 页面授权相关的 API 接口
import { request } from '@/utils/request'

// 设置请求拦截器
export function reqInterceptorAPI() {
  return request.interceptors.request.use((config) => {
    // 为请求头添加 Authorization 字段，用于访问有权页面
    config.headers.Authorization = sessionStorage.getItem('token')
    // 不 return 就被拦截了
    return config
  })
}
