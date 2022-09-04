import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 共享的数据
const state = {
  // 《店家列表数据》

  // 控制搜索弹出层的展示
  searchPopup: false,

  // 《单页面头部导航栏》
  // 控制单页面头部导航栏，控件的按需展示
  headerAttrParams: {
    // 导航栏标题
    title: '',
    // 是否展示登录按钮
    loginShow: false,
    // 是否展示搜索按钮
    iconShow: false,
    // 根据 token 是否展示头像
    avatarShow: false
  },
  // 4 位验证码
  codeValue: '',
  // 头像背景色
  avatarColor: ''
}
// 处理数据的方法
const mutations = {
  // 生成 4 位数验证码
  setCodeValue(state) {
    state.codeValue = ''
    for (let i = 0; i < 4; i++) {
      state.codeValue += Math.floor(Math.random() * 10)
    }
    console.log(state.codeValue)
    return state.codeValue
  },
  // 取九宫格的文字作为食品分类页面的标题
  sendCateTitle(state, title) {
    // 跳过 state 直接用 session 了
    sessionStorage.setItem('cateTitle', title)
  },
  // 监听搜索弹出层展示的方法
  showSearchPopup(state, step) {
    state.searchPopup = step
  },
  // 获取验证“单页面”身份的键
  getSinglePageKey(state) {
    const singlePageKey = sessionStorage.getItem('singlePageKey')
    // token 用来判断登录后的页面显示状态
    const token = sessionStorage.getItem('token')
    // 根据 singlePageKey 来处理不同页面
    switch (singlePageKey) {
      case 'Home':
        if (token) {
          // 已登录，将登录入口替换为头像
          state.headerAttrParams.title = '首页'
          state.headerAttrParams.iconShow = true
          state.headerAttrParams.loginShow = false
          state.headerAttrParams.avatarShow = true
          break
        }
        // 未登录，继续显示登录入口
        state.headerAttrParams.title = '首页'
        state.headerAttrParams.iconShow = true
        state.headerAttrParams.loginShow = true
        state.headerAttrParams.avatarShow = false
        break
      case 'Order':
        state.headerAttrParams.title = '订单'
        state.headerAttrParams.iconShow = false
        state.headerAttrParams.loginShow = false
        state.headerAttrParams.avatarShow = false
        break
      default:
        console.log('渲染失败了喔')
    }
  }
}
// 处理异步操作
const actions = {}
// 封装 state 数据后输出
const getters = {
  // 设置头像背景颜色
  setAvatarColor(state) {
    state.avatarColor = sessionStorage.getItem('avatarColor')
    return state.avatarColor
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})
