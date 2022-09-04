// 首页相关的 API
import { request } from '@/utils/request.js'

// 获取首页食品分类九宫格的API
export function getCateListAPI() {
  return request.get('/v1/home/cate')
}

// 获取首页商铺列表
export function getStoreListAPI(storeParams) {
  return request.get('/v1/shop_list', {
    params: storeParams
  })
}
