<template>
  <div class="home-container">
    <van-pull-refresh v-model="loadListParams.isLoading" @refresh="isRefreshing" success-text="刷新成功~" :disabled="loadListParams.isDisabled">
      <!-- 头部轮播列表 -->
      <van-swipe class="my-swipe" :loop="false">
        <!-- 轮播的第一页 -->
        <van-swipe-item>
          <!-- 头部九宫格链接 -->
          <van-grid :column-num="4" clickable icon-size="1.2rem">
            <!-- 循环渲染后8项 -->
            <van-grid-item v-for="item in cateList.slice(cateList.length / 2)" :key="item.id" :icon="`https://fuss10.elemecdn.com/${item.image_url}`" :text="item.title"></van-grid-item>
          </van-grid>
        </van-swipe-item>
        <!-- 轮播的第二页 -->
        <van-swipe-item>
          <!-- 头部九宫格链接 -->
          <van-grid :column-num="4" clickable icon-size="1.2rem">
            <!-- 循环渲染前8项 -->
            <van-grid-item v-for="item in cateList.slice(0, cateList.length / 2)" :key="item.id" :icon="`https://fuss10.elemecdn.com/${item.image_url}`" :text="item.title"></van-grid-item>
          </van-grid>
        </van-swipe-item>
      </van-swipe>

      <!-- 列表头部文字 -->
      <div class="store_list_header">
        <van-icon name="cart-o" color="#999" size="18" />
        <p>推荐商家</p>
      </div>
      <!-- 推荐店家列表 -->
      <van-list v-model="loadListParams.loading" :finished="loadListParams.finished" finished-text="我是有底线的！" @load="loadStoreList" offset="5">
        <!-- 循环渲染列表的每一项 -->
        <van-cell v-for="item in storeList" :key="item.id">
          <!-- 店家信息项 -->
          <div class="store_info">
            <!-- 店家信息项左侧图片部分 -->
            <div class="store_info_left">
              <img :src="`https://elm.cangdu.org/img/${item.image_path}`" alt="" />
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
    </van-pull-refresh>
  </div>
</template>

<script>
import { getCateListAPI, getStoreListAPI } from '@/apis/homeAPI.js'
export default {
  name: 'Home',
  data() {
    return {
      // 食品分类列表数据
      cateList: [],
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
        limit: 5
      },
      // 店家列表数据
      storeList: [],
      // 控制推荐店家列表加载的参数对象
      loadListParams: {
        // 上拉加载：是否正在加载 (初值设置 true，初始就将 load 事件禁止掉；因为刚开始还未下拉操作，无需触发 load 事件。)
        loading: true,
        // 上拉加载：所有数据是否加载完毕
        finished: false,
        // 下拉刷新：是否正在刷新
        isLoading: false,
        // 下拉刷新：禁用下拉刷新功能
        isDisabled: false
      }
    }
  },
  created() {
    this.getCateList()
    this.getStoreList()
  },
  computed: {},
  methods: {
    // 获取食品分类列表
    async getCateList() {
      const { data: res } = await getCateListAPI()
      this.cateList = res
      // 修改在这！！！----------------------122-123
      console.log(this.cateList)
    },
    // 获取店家列表
    async getStoreList() {
      const { data: res } = await getStoreListAPI(this.storeParams)
      // 判断是下拉刷新，还是上拉加载
      if (this.loadListParams.isLoading) {
        // 下拉刷新：新数据在前
        this.storeList = [...res, ...this.storeList]
        this.loadListParams.isLoading = false
      } else {
        // 上拉加载：新数据在后
        this.storeList = [...this.storeList, ...res]
        // 初始渲染列表完毕时，将允许触发接下来的 load 事件
        this.loadListParams.loading = false
      }
      // 控制加载的总条数为30
      if (this.storeList.length === 30) {
        // 刷新完毕
        this.loadListParams.isLoading = false
        // 全部数据加载完，禁用下拉刷新功能
        this.loadListParams.isDisabled = true
        // 上拉加载，数据加载完毕了
        this.loadListParams.finished = true
      }
    },
    // 监听加载更多店家列表的事件
    loadStoreList() {
      // 允许触发 load 后，立即防止外界多次触发 load (对外界禁止触发 load 事件)
      this.loadListParams.loading = true
      // 拿到列表的下5项数据
      this.storeParams.offset += 5
      this.getStoreList()
    },
    // 监听下拉刷新的事件
    isRefreshing() {
      // 开始刷新
      this.loadListParams.isLoading = true
      this.storeParams.offset += 5
      this.getStoreList()
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

// 直接 !important 覆盖不生效，用 /deep/
/deep/ .van-swipe__indicators {
  bottom: 5px;
}

.my-swipe {
  margin-bottom: 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.store_list_header {
  position: relative;
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom: 1px solid #eee;
  .van-icon {
    position: absolute;
    top: 20px;
    left: 24px;
  }
  p {
    position: absolute;
    top: 20px;
    left: 70px;
    font-size: 26px;
    color: #999;
  }
}

// 使用店家列表的样式类
.store-list();
</style>
