// 用户页相关的 API
import { request } from '@/utils/request.js'

// 获取用户页服务列表的API
export function getServiceListAPI() {
  return request.get('/v1/user/list')
}
