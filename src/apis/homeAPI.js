// 首页相关的 API
import { request } from '@/utils/request.js'

// 获取食品分类列表的API
export function getCateListAPI() {
  return request.get('/v2/index_entry')
}

// 获取商铺列表
export function getStoreListAPI(storeParams) {
  return request.get('/shopping/restaurants', {
    params: storeParams
  })
}
