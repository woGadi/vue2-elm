import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 共享的数据
const state = {
  // 《店家列表数据》
  // 《店家列表数据》

  // 控制搜索弹出层的展示
  searchPopup: false
}
// 处理数据的方法
const mutations = {
  // 监听搜索弹出层展示的方法
  showSearchPopup(state, step) {
    state.searchPopup = step
  }
}
// 处理异步操作
const actions = {
  /* // 获取店家列表
  async getStoreList(context) {
    const getState = context.state
    const { data: res } = await getStoreListAPI(getState.storeParams)
    // 上拉加载：新数据在后
    getState.storeList = [...getState.storeList, ...res]
    // 初始渲染列表完毕时，将允许触发接下来的 load 事件
    getState.loadListParams.loading = false
    // 控制加载的总条数为30
    if (getState.storeList.length === 30) {
      // 上拉加载，数据加载完毕了
      getState.loadListParams.finished = true
    }
  } */
}
// 封装 state 数据后输出
const getters = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})
