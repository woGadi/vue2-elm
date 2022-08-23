<template>
  <div class="category-container">
    <!-- 公共返回组件 -->
    <HeaderBack></HeaderBack>

    <!-- 标题横幅 -->
    <div class="banner">
      <div class="title">
        <p>《美食类型》</p>
        <h3>{{ cateTitle }}</h3>
      </div>
    </div>

    <!-- 美食类型的店家列表 -->
    <van-list v-model="loadListParams.loading" :finished="loadListParams.finished" finished-text="我是有底线的！" @load="loadStoreList" offset="5" :immediate-check="false" v-if="storeList.length !== 0">
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
  </div>
</template>

<script>
import HeaderBack from '@/components/HeaderBack/HeaderBack.vue'
import { getStoreListAPI } from '@/apis/homeAPI.js'
export default {
  name: 'Category',
  data() {
    return {
      // 食品分类页面标题
      cateTitle: '',
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
      // 请求数据条数总量
      total: 30,
      // 店家列表数据
      storeList: [],
      // 控制店家列表加载的参数对象
      loadListParams: {
        // 上拉加载：是否正在加载 (初值设置 true，初始就将 load 事件禁止掉；因为刚开始还未下拉操作，无需触发 load 事件。)
        loading: true,
        // 上拉加载：所有数据是否加载完毕
        finished: false
      }
    }
  },
  created() {
    this.getCateTitle()
    this.getStoreList()
  },
  methods: {
    // 获取分类标题
    getCateTitle() {
      this.cateTitle = sessionStorage.getItem('cateTitle')
    },
    // 获取店家列表
    async getStoreList() {
      const { data: res } = await getStoreListAPI(this.storeParams)
      // 上拉加载：新数据在后
      this.storeList = [...this.storeList, ...res]
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
      // 拿到列表的下5项数据
      this.storeParams.offset += 5
      this.getStoreList()
    }
  },
  components: {
    HeaderBack
  }
}
</script>

<style lang="less" scoped>
@import '@/style/common.less';
.category-container {
  height: 100%;
  background-color: #eee;
}

.banner {
  position: relative;
  margin-bottom: 20px;
  height: 510px;
  background-color: #0063b1;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: #fff;
  text-align: center;
  .title {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translate(0, -50%);
    p {
      margin-bottom: 20px;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 5px;
    }
    h3 {
      font-size: 80px;
      letter-spacing: 15px;
    }
  }
}

.van-list {
  margin-top: 20px;
}

.van-cell {
  padding: 30px 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

// 使用店家列表的样式类
.store-list();
</style>
