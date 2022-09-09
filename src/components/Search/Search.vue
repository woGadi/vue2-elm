<template>
  <div class="search-container">
    <!-- 官方 Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <!-- 搜索框 -->
      <van-search v-model="storeInfoSearch" show-action placeholder="请输入搜索关键词" @cancel="searchPopupClosed" @search="searchStoreList" @clear="clearSearchValue" />

      <!-- 搜索展示的店家列表 -->
      <van-list v-model="loadListParams.loading" :finished="loadListParams.finished" finished-text="我是有底线的！" @load="loadStoreList" offset="5" :immediate-check="false" v-if="storeList.length !== 0">
        <!-- 循环渲染列表的每一项 -->
        <van-cell v-for="item in storeList" :key="item.id" @click="toStore">
          <!-- 店家信息项 -->
          <div class="store_info">
            <!-- 店家信息项左侧图片部分 -->
            <div class="store_info_left">
              <img :src="item.image_path" alt="" />
            </div>
            <!-- 店家信息项右侧文字部分 -->
            <div class="store_info_right">
              <!-- 文字上部分 div -->
              <div>
                <span>
                  <van-tag color="#F9CC9D" text-color="#000">
                    <b>招牌</b>
                  </van-tag>
                  <h3>{{ item.name }}</h3>
                </span>
                <span>
                  <p>{{ item.supports[0].icon_name }} {{ item.supports[1].icon_name }} 票</p>
                </span>
              </div>
              <!-- 文字中部分 div -->
              <div>
                <span>
                  <van-rate v-model="item.rating" allow-half void-icon="star" color="orange" void-color="#eee" size="12px" gutter="0px" />
                  <p class="rating_p">{{ item.rating }}</p>
                  <p>月售{{ item.recent_order_num }}单</p>
                </span>
                <span>
                  <van-tag color="#0063B1">{{ item.delivery_mode.text }}</van-tag>
                  <van-tag color="#0063B1" plain>准时达</van-tag>
                </span>
              </div>
              <!-- 文字下部分 div -->
              <div>
                <span>
                  <p>￥20起送 / {{ item.piecewise_agent_fee.tips }}</p>
                </span>
                <span>
                  <p>{{ item.distance }} / {{ item.order_lead_time }}</p>
                </span>
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>

      <!-- 列表为空时，展示列表的空状态 -->
      <van-empty image="search" description="查找不到店家喔，再找找看~" v-else></van-empty>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getStoreListAPI } from '@/apis/homeAPI.js'
export default {
  name: 'Search',
  data() {
    return {
      // 店家信息搜索对象
      storeInfoSearch: '',
      // 店家的参数信息
      storeParams: {
        // 地区的纬度
        latitude: '31.38098',
        // latitude: '23.375357',
        // 地区的经度
        longitude: '121.50146',
        // longitude: '113.208441'
        // 跳过的数据条数
        offset: 160,
        // 请求数据的数量
        limit: 6
      },
      // 请求数据条数总量
      total: 30,
      // 店家列表数据
      storeList: [],
      // 控制搜索店家列表加载的参数对象
      loadListParams: {
        // 上拉加载：是否正在加载 (初值设置 true，初始就将 load 事件禁止掉；因为刚开始还未下拉操作，无需触发 load 事件。)
        loading: true,
        // 上拉加载：所有数据是否加载完毕
        finished: false
      }
    }
  },
  created() {
    this.getStoreList()
  },
  computed: {
    ...mapState(['searchPopup'])
  },
  methods: {
    ...mapMutations(['showSearchPopup']),
    // 获取店家列表
    async getStoreList() {
      const { data: res } = await getStoreListAPI(this.storeParams)
      // 上拉加载：新数据在后
      this.storeList = [...this.storeList, ...res.data]
      console.log(this.storeList)
      // 初始渲染列表完毕时，将允许触发接下来的 load 事件
      this.loadListParams.loading = false
      // 控制加载的总条数为30
      if (this.storeList.length === this.total) {
        // 上拉加载，数据加载完毕了
        this.loadListParams.finished = true
      }
    },
    // 监听加载更多店家列表的事件
    loadStoreList() {
      // 允许触发 load 后，立即防止外界多次触发 load (对外界禁止触发 load 事件)
      this.loadListParams.loading = true
      // 拿到列表的下6项数据
      this.storeParams.offset += 6
      this.getStoreList()
    },
    // 监听确认搜索店家列表事件
    async searchStoreList() {
      // 判断用户输入内容是否为空
      if (this.storeInfoSearch.trim() === '') return
      // 定义搜索结果数组
      const searchResult = []
      // 初始化数据，基于所有数据进行搜索
      this.storeParams.offset = 160
      this.storeParams.limit = this.total
      const { data: res } = await getStoreListAPI(this.storeParams)
      // 拿到列表的每一项
      res.data.forEach((item) => {
        // 判断每一项的 name，是否包含用户键入的值
        if (item.name.indexOf(this.storeInfoSearch.trim()) !== -1) {
          // 包含就将这一整项，加入搜索结果数组
          searchResult.push(item)
        }
      })
      // 格式化搜索框内容
      this.storeInfoSearch = this.storeInfoSearch.trim()
      // 将搜索结果数组赋值，以渲染到页面上
      this.storeList = searchResult
      // 搜索结束，防止继续触发 loadStoreList 事件
      this.loadListParams.finished = true
      console.log(this.storeList)
    },
    // 点击搜索框中的清空按钮，初始化列表
    clearSearchValue() {
      // 初始化数据
      this.storeList = []
      this.storeParams.offset = 160
      this.storeParams.limit = 6
      /* 关键一步！
      以下是猜测 (经测试，以下猜测不成立。。)
      1. 因为初始化列表 this.storeList = [] 时，列表模型坍塌 (没有高度了)，导致弹出层滚动条触发 load 事件的时机提前 (offset趋于无穷大)；
      2. 在 this.getStoreList() 中的 this.loadListParams.loading = false 解除了触发限制，所以在列表模型坍塌的一瞬间，多触发了一次 load 事件！
      3. 感觉，理论上，只要列表加载出来展开的足够慢，load 在这期间会触发多次 */
      this.loadListParams.loading = true
      this.loadListParams.finished = false
      this.getStoreList()
    },
    // 监听搜索弹出层的关闭事件
    searchPopupClosed() {
      // 初始化列表
      this.clearSearchValue()
      this.showSearchPopup(false)
    },
    // 跳转商店详情页面
    toStore() {
      this.$router.push('/store')
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.home-container {
  padding-top: 1.22667rem;
  padding-bottom: 1.33333rem;
}

.van-search {
  position: fixed;
  top: 0;
  left: 0;
  margin-bottom: 20px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  z-index: 1;
}

.van-list {
  margin-top: 130px;
}

.van-cell {
  padding: 30px 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

// 使用店家列表的样式类
.store-list();

.van-empty {
  position: absolute;
  top: 50%;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  transform: translate(0, -50%);
}
</style>
