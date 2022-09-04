// 注册相关的 API
import axios from 'axios'
import qs from 'qs'

// 注册和登录请求自己写的后台
const request = axios.create({
  baseURL: 'http://127.0.0.1:8082'
})

// 提交注册信息
export function postRegisterInfoAPI(registerForm) {
  /* 这里使用 qs 的原因是：axios 默认发送数据时，数据格式是 Request Payload，而并非我们常用的 Form Data 格式，后端未必能正常获取到；
  所以在发送之前，需要使用 qs 模块对其进行处理；经 qs 处理之后，发送给后台时就是Format Data 格式了。 */
  const userinfo = qs.stringify({
    mobile: registerForm.mobile,
    username: registerForm.username,
    password: registerForm.password
  })
  return request.post('/v1/register', userinfo)
}
