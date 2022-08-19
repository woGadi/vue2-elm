<template>
  <div class="search-container">
    <!-- 官方 Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search v-model="storeInfoSearch" show-action placeholder="请输入搜索关键词" />

      <!-- 搜索展示的店家列表 -->
      <van-list v-model="loadListParams.loading" :finished="loadListParams.finished" finished-text="我是有底线的！" @load="loadStoreList" offset="5">
        <!-- 循环渲染列表的每一项 -->
        <van-cell v-for="item in storeList" :key="item.id">
          <!-- 店家信息分为 -->
          <div class="store_info">
            <div class="store_info_left">
              <img :src="`https://elm.cangdu.org/img/${item.image_path}`" alt="" />
            </div>
            <div class="store_info_right">
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
    </form>
  </div>
</template>

<script>
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
        limit: 2
      },
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
  methods: {
    // 获取店家列表
    async getStoreList() {
      const { data: res } = await getStoreListAPI(this.storeParams)
      // 上拉加载：新数据在后
      this.storeList = [...this.storeList, ...res]
      // 初始渲染列表完毕时，将允许触发接下来的 load 事件
      this.loadListParams.loading = false
      // 控制加载的总条数为30
      if (this.storeList.length === 30) {
        // 上拉加载，数据加载完毕了
        this.loadListParams.finished = true
      }
    },
    // 监听加载更多店家列表的事件
    loadStoreList() {
      // 允许触发 load 后，立即防止外界多次触发 load (对外界禁止触发 load 事件)
      this.loadListParams.loading = true
      // 拿到列表的下2项数据
      this.storeParams.offset += 2
      this.getStoreList()
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 1.22667rem;
  padding-bottom: 1.33333rem;
}

.van-cell {
  padding: 30px 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.store_info {
  display: flex;
  height: 150px;
  .store_info_left {
    flex: 2;
    margin-right: 15px;
    img {
      // width: 150px;
      width: 100%;
      height: 100%;
    }
  }
  .store_info_right {
    flex: 7;
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      span:first-child {
        flex: 6;
        position: relative;
        height: 52px;
        p {
          font-size: 12px;
          color: #666;
          // 字体小于 12px
          transform: scale(0.9);
        }
        /* 标签样式 */
        .van-tag {
          position: absolute;
          top: 8px;
          padding: 0 3px;
          height: 30px;
          text-align: center;
        }
        h3 {
          position: absolute;
          left: 60px;
          width: 240px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 2px;
        }
        .van-rate {
          // position: absolute;
          // bottom: 3px;
          float: left;
          margin-top: 10px;
          width: 46%;
        }
        .rating_p {
          // left: 130px;
          // top: 3px;
          float: left;
          margin-left: 5px;
          margin-right: 10px;
          transform: scale(1);
          color: orange;
        }
      }
      span:last-child {
        flex: 4;
        position: relative;
        p {
          position: absolute;
          right: 0;
          font-size: 12px;
          color: #999;
          transform: scale(0.8);
        }
        .van-tag {
          position: absolute;
          top: 8px;
          right: 0;
          padding: 2px 3px;
          height: 30px;
          text-align: center;
          transform: scale(0.8);
        }
        .van-tag:first-child {
          right: 62px;
        }
      }
    }
  }
}

.van-search {
  margin-bottom: 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
</style>
