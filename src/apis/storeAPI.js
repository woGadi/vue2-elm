// 商家页相关的 API
import { request } from '@/utils/request'

// 根据商家 id 获取对应的商品列表
export function getGoodsListAPI(storeId) {
  return request.get(`/v1/shop/${storeId}`)
}

// import { getStoreListAPI } from '@/apis/homeAPI.js'

// 请求同个 API，调用即可
// export const getStoreInfoAPI = (storeParams) => {
//   return getStoreListAPI(storeParams)
// }
