import axios from 'axios'

// 请求根路径
export const request = axios.create({
  baseURL: 'https://elm.cangdu.org'
})
