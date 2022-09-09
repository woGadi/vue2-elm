// 商家页相关的 API
import { request } from '@/utils/request'

// 获取商品列表
export function getGoodsListAPI() {
  return request.get('/v1/shop')
}

// import { getStoreListAPI } from '@/apis/homeAPI.js'

// 请求同个 API，调用即可
// export const getStoreInfoAPI = (storeParams) => {
//   return getStoreListAPI(storeParams)
// }
