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
  },
  // 《商家页》
  // 点击提交订单携带的信息
  // submitGoodsOrder: []
  // 商家页的 id，用于请求对应页面数据，和跳转对应商家页
  storeId: 0,
  // 商品总金额整数部分
  amountPre: 0,
  // 商品总金额小数部分
  amountSuf: 0,
  // 《订单页》
  // 未支付的订单列表
  orderList: [],
  // 订单列表的每一项
  orderListItem: {},
  // 自定义订单列表每一项的 id
  id: 1,
  // 合计
  orderAmount: 0,
  // 已支付的订单列表
  paidOrderList: [],
  // 《足迹页》
  // 足迹列表数据
  footPrintList: []
}
// 处理数据的方法
const mutations = {
  // 清空足迹列表
  clearFootPrint(state) {
    console.log(123)
    state.footPrintList = []
    location.reload()
  },
  // 将其他页面传来的商家列表项，组成足迹页列表的每一项
  setFootPrintList(state, step) {
    state.footPrintList.unshift(step)
  },
  // 清空已支付的订单
  clearPaid(state) {
    state.paidOrderList = []
    setTimeout(() => {
      location.reload()
    }, 1000)
  },
  // 清空未支付的订单
  clearUnpaid(state) {
    state.orderList = []
    state.orderAmount = 0
    // 重新加载页面
    setTimeout(() => {
      location.reload()
    }, 1000)
  },
  // 将未支付列表展开，逐一加入到已支付列表中
  setPaidOrderList(state, step) {
    state.paidOrderList.push(...step)
  },
  // 取消订单时，合计相应减少
  subOrderAmount(state, step) {
    const subResult = state.orderAmount - step
    // state.orderAmount = 0
    // toFixed 返回值是 string？ 还是 js 隐式类型转换？
    state.orderAmount = subResult.toFixed(2) - 0
    console.log(typeof state.orderAmount)
  },
  // 存储商家的 id
  setStoreId(state, step) {
    state.storeId = step
  },
  // 将生成的订单每一项加入到列表中，生成订单列表
  setOrderList(state) {
    state.orderList.push(state.orderListItem)
  },
  // 共享商家页的购物车列表，供订单页使用
  prodOrderData(state, step) {
    // 提交商品的名称数组
    const goodsName = []
    // 提交商品的数量数组
    const goodsInitCount = []
    step.forEach((item) => {
      // 将提交的商品数据放入数组
      goodsName.push(item.name)
      goodsInitCount.push(item.initCount)
    })
    // 提交的商品数据
    const goodsData = {
      goods_name: goodsName,
      goods_init_count: goodsInitCount
    }
    // 拿到商家信息对象
    const storeInfo = JSON.parse(sessionStorage.getItem('storeInfo'))
    // 订单列表的每一项，供订单页渲染
    const orderListItem = {
      id: state.id,
      goods_data: goodsData,
      store_img: storeInfo.img,
      store_name: storeInfo.name,
      store_rating: storeInfo.rating,
      store_delivery: storeInfo.delivery,
      store_amount: sessionStorage.getItem('storeAmount') - 0,
      // 商家id，用于根据id，跳转对应商家页面
      store_id: state.storeId
    }
    // 每提交一次，订单项 id 自增
    state.id++
    // 累加订单项的金额
    state.orderAmount += sessionStorage.getItem('storeAmount') - 0
    state.orderListItem = orderListItem
    return console.log(state.orderListItem)
  },
  // 获取商品总金额整数部分
  getAmountPre(state, step) {
    // 总金额有：商家页的总金额、订单页的总金额
    if (step === 'store') {
      state.amountPre = sessionStorage.getItem('storeAmount').slice(0, -3) - 0
    } else {
      const orderAmount = state.orderAmount.toFixed(2) + ''
      // 默认的数值0不保留2位小数，因此 slice 截取不到 3 位后的字符，只有0一个字符；给 - 0 隐式转换即可。
      state.amountPre = orderAmount.slice(0, -3) - 0
    }
  },
  // 获取商品总金额小数部分
  getAmountSuf(state, step) {
    if (step === 'store') {
      let amountSuf = sessionStorage.getItem('storeAmount').slice(-2) - 0
      // 保持总金额小数部分的 2 位数
      state.amountSuf = amountSuf < 10 ? '0' + amountSuf : amountSuf
    } else {
      const orderAmount = state.orderAmount.toFixed(2) + ''
      let amountSuf = orderAmount.slice(-2) - 0
      state.amountSuf = amountSuf < 10 ? '0' + amountSuf : amountSuf
    }
  },
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
const getters = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})
