import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 共享的数据
const state = {
  // 《首页》
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
    searchShow: false,
    // 根据 token 是否展示头像
    avatarShow: false,
    // 是否展示设置按钮
    settingShow: false,
    // 是否展示退出按钮
    logoutShow: false
  },
  // 《注册登录页》
  // 4 位验证码
  codeValue: '',
  // 《用户页》
  // 用户信息，用于页面的按需展示
  userInfo: {
    user_id: 0, // 用户id
    username: '', // 用户名
    avatarColor: '' // 头像背景色
  }
}
// 处理数据的方法
const mutations = {
  // 修改商品页面总金额
  setStoreAmount(state, params) {
    // let asd = item.price * (item.initCount + 1)
    let unitPrice = params.price
    unitPrice = unitPrice.toFixed(2) - 0
    // 读取上次合计的总金额
    let storeAmount = sessionStorage.getItem('storeAmount') - 0
    // 判断点击按钮是 + 还是 -
    if (params.type === 'add') {
      // 追加金额
      storeAmount = storeAmount + unitPrice
    } else {
      // 消减金额
      storeAmount = storeAmount - unitPrice
    }
    console.log(storeAmount.toFixed(2))
    // 修改并存储总金额
    sessionStorage.setItem('storeAmount', storeAmount.toFixed(2) + '')
    console.log(storeAmount.toFixed(2))
  },
  // 共享登录后返回的用户信息
  shareUserInfo(state, res) {
    state.userInfo.user_id = res.user_id
    state.userInfo.username = res.username
    state.userInfo.avatarColor = res.avatar
  },
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
          state.headerAttrParams.searchShow = true
          state.headerAttrParams.loginShow = false
          state.headerAttrParams.avatarShow = true
          state.headerAttrParams.settingShow = false
          state.headerAttrParams.logoutShow = false
          break
        }
        // 未登录，继续显示登录入口
        state.headerAttrParams.title = '首页'
        state.headerAttrParams.searchShow = true
        state.headerAttrParams.loginShow = true
        state.headerAttrParams.avatarShow = false
        state.headerAttrParams.settingShow = false
        state.headerAttrParams.logoutShow = false
        break
      case 'Order':
        state.headerAttrParams.title = '订单'
        state.headerAttrParams.searchShow = false
        state.headerAttrParams.loginShow = false
        state.headerAttrParams.avatarShow = false
        state.headerAttrParams.settingShow = false
        state.headerAttrParams.logoutShow = false
        break
      case 'User':
        if (token) {
          state.headerAttrParams.title = '我的'
          state.headerAttrParams.searchShow = false
          state.headerAttrParams.loginShow = false
          state.headerAttrParams.avatarShow = false
          state.headerAttrParams.settingShow = true
          state.headerAttrParams.logoutShow = true
          break
        }
        state.headerAttrParams.title = '我的'
        state.headerAttrParams.searchShow = false
        state.headerAttrParams.loginShow = true
        state.headerAttrParams.avatarShow = false
        state.headerAttrParams.settingShow = true
        state.headerAttrParams.logoutShow = false
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
  // setAvatarColor(state) {
  //   state.avatarColor = sessionStorage.getItem('avatarColor')
  //   return state.avatarColor
  // }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})
