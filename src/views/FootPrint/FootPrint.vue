<template>
  <div class="foot-print-container">
    <HeaderBack></HeaderBack>

    <!-- 顶部填充颜色 -->
    <div class="header">
      <div class="title">
        <p>我的足迹</p>
      </div>
      <div class="clear">
        <van-button @click="clearFootPrintList">清空</van-button>
      </div>
    </div>

    <!-- 搜索展示的店家列表 -->
    <van-list v-if="footPrintList.length !== 0">
      <!-- 循环渲染列表的每一项 -->
      <van-cell v-for="item in footPrintList" :key="item.id" @click="toStore(item)">
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
    <van-empty image="https://img01.yzcdn.cn/vant/custom-empty-image.png" description="还没有足迹呢，快去逛逛吧~" v-else></van-empty>
  </div>
</template>
<script>
import HeaderBack from '@/components/HeaderBack/HeaderBack.vue'
export default {
  name: 'FootPrint',
  data() {
    return {
      // 足迹列表数据
      footPrintList: this.$store.state.footPrintList
    }
  },
  methods: {
    toStore(item) {
      // 将商家信息存入 sessionStorage
      const storeInfo = {
        img: item.image_path,
        name: item.name,
        rating: item.rating,
        delivery: item.piecewise_agent_fee.tips
      }
      sessionStorage.setItem('storeInfo', JSON.stringify(storeInfo))
      // 将商家 id，共享给订单页商家跳转使用
      this.$store.commit('setStoreId', item.id)
      this.$router.push({ path: '/store', query: { store_id: item.id } })
    },
    // 清空足迹列表
    clearFootPrintList() {
      this.$store.commit('clearFootPrint')
    }
  },
  components: {
    HeaderBack
  }
}
</script>
<style lang="less" scoped>
@import '@/style/common.less';
.foot-print-container {
  padding-bottom: 40px;
  // height: 100%;
  // background-color: pink;
}

.header {
  position: relative;
  height: 1.22667rem;
  background-color: #0063b1;
  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    // background-color: pink;
    text-align: center;
    transform: translate(-50%, -50%);
    p {
      font-size: 36px;
      color: #fff;
      letter-spacing: 2px;
    }
  }
  .clear {
    position: absolute;
    top: 50%;
    right: 0;
    padding: 0 10px 0 0;
    // background-color: orange;
    transform: translate(0, -50%);
    z-index: 1;
    .van-button {
      padding: 0 16px;
      height: 60px;
      font-size: 36px;
      color: #fff;
      border-radius: 15px;
      background-color: transparent;
    }
  }
}

.van-list {
  margin-top: 20px;
  padding: 10px 0;
  background-color: #fff;
  border-radius: 15px;
  .van-cell {
    border-bottom: 1px solid #eee;
  }
}

/deep/ .van-empty {
  height: 1000px;
  .van-empty__image {
    width: 240px;
    height: 240px;
  }
}

// 使用店家列表的样式类
.store-list();
</style>
