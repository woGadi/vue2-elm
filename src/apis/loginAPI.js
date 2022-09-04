// 登录相关的 API
import axios from 'axios'
import qs from 'qs'

// 注册和登录请求自己写的后台
const request = axios.create({
  baseURL: 'http://127.0.0.1:8082'
})

// 获取验证码的API
// export function getCodeAPI() {
//   return request.post('/v1/captchas')
// }

// 登录账户的API
export function postLoginInfoAPI(loginForm) {
  const userinfo = qs.stringify({
    username: loginForm.username,
    password: loginForm.password
  })
  return request.post('/v1/login', userinfo)
}
