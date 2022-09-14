<template>
  <div class="order-container">
    <!-- 轮播框架包裹：未支付、已支付订单列表 -->
    <van-swipe :loop="false" :show-indicators="false" ref="orderSwipeRef" @change="orderSwipeChange" id="van-swipe">
      <!-- 轮播框架的高度是否固定？《第一种解决方案》 -->
      <!-- <van-swipe-item :class="{ 'swipe-fixed-height': isFixedUnpaid }"> -->
      <van-swipe-item>
        <!-- 未支付的订单列表 -->
        <div class="order-list" ref="orderListRef" v-if="orderList.length">
          <van-list>
            <van-cell v-for="item in orderList" :key="item.id">
              <div class="order-item">
                <!-- 订单项图片 -->
                <div class="order-item-img">
                  <img :src="item.store_img" />
                </div>
                <!-- 订单项信息 -->
                <div class="order-item-info">
                  <div class="store-name" @click="toStore(item)">
                    <h3>{{ item.store_name }}</h3>
                    <van-icon name="arrow" />
                  </div>
                  <div class="goods-info">
                    <p>{{ item.goods_data.goods_name[0] }} × {{ item.goods_data.goods_init_count[0] }}</p>
                    <p v-if="item.goods_data.goods_name.length > 1">{{ item.goods_data.goods_name[1] }} × {{ item.goods_data.goods_init_count[1] }}</p>
                    <p v-if="item.goods_data.goods_name.length > 2">{{ item.goods_data.goods_name[2] }} × {{ item.goods_data.goods_init_count[2] }} ...</p>
                  </div>
                </div>
                <!-- 订单项价格 -->
                <div class="order-item-price">
                  <h3><span>￥</span>{{ item.store_amount.toFixed(2) }}</h3>
                  <div class="opt">
                    <van-button class="opt-cancel" @click="cancelOrder(item)">取消订单</van-button>
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </div>
        <!-- 订单列表为空时的状态 -->
        <van-empty class="empty-state" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" description="订单空空如也~" v-if="!orderList.length" />
      </van-swipe-item>
      <van-swipe-item>
        <!-- 已支付的订单列表 -->
        <div class="order-list" ref="paidOrderListRef" v-if="paidOrderList.length">
          <van-list>
            <van-cell v-for="item in paidOrderList" :key="item.id">
              <div class="order-item">
                <!-- 订单项图片 -->
                <div class="order-item-img">
                  <img :src="item.store_img" />
                </div>
                <!-- 订单项信息 -->
                <div class="order-item-info">
                  <div class="store-name" @click="toStore(item)">
                    <h3>{{ item.store_name }}</h3>
                    <van-icon name="arrow" />
                  </div>
                  <div class="goods-info">
                    <p>{{ item.goods_data.goods_name[0] }} × {{ item.goods_data.goods_init_count[0] }}</p>
                    <p v-if="item.goods_data.goods_name.length > 1">{{ item.goods_data.goods_name[1] }} × {{ item.goods_data.goods_init_count[1] }}</p>
                    <p v-if="item.goods_data.goods_name.length > 2">{{ item.goods_data.goods_name[2] }} × {{ item.goods_data.goods_init_count[2] }} ...</p>
                  </div>
                </div>
                <!-- 订单项价格 -->
                <div class="order-item-price">
                  <h3><span>￥</span>{{ item.store_amount.toFixed(2) }}</h3>
                  <div class="opt">
                    <van-button class="opt-remind">催单</van-button>
                    <van-button class="opt-sending">查看物流</van-button>
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </div>
        <!-- 订单列表为空时的状态 -->
        <van-empty class="empty-state" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" description="订单空空如也~" v-if="!paidOrderList.length" />
      </van-swipe-item>
    </van-swipe>

    <!-- 支付弹出层 -->
    <van-popup v-model="showPayPopup" round position="bottom" :overlay="false" :lock-scroll="false">
      <div class="pay-popup">
        <div class="amount-all">
          <div class="amount" v-if="!swipeItemIndex">
            <p>合计：</p>
            <span>￥</span>
            <h3>
              {{ amountPre }}.<span>{{ amountSuf }}</span>
            </h3>
          </div>
          <van-button v-else>
            <p>全部订单</p>
          </van-button>
        </div>

        <div class="toggle">
          <van-button @click="toggleOrder" v-if="!swipeItemIndex">
            <p>查看已支付</p>
          </van-button>
          <van-button @click="toggleOrder" v-else>
            <p>查看未支付</p>
          </van-button>
        </div>
        <div class="pay-clear">
          <van-button @click="payOrderGoods" v-if="!swipeItemIndex">
            <p>立即支付</p>
          </van-button>
          <van-button @click="clearOrderGoods" v-else>
            <p>清空订单</p>
          </van-button>
        </div>
      </div>
    </van-popup>

    <!-- 确认对话框 -->
    <van-dialog v-model="showConfirmDialog" :show-cancel-button="true" @confirm="confirmDialog">
      <div class="msg" v-if="!swipeItemIndex">
        <p class="msg-title">掏钱包支付...</p>
        <h3><span>￥</span>{{ $store.state.orderAmount.toFixed(2) }}</h3>
      </div>
      <div class="msg" v-else>
        <p class="msg-text">确定要清空订单吗？</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Order',
  data() {
    return {
      // 控制支付动作面板的展示与隐藏
      showPayPopup: false,
      // 未支付的订单列表
      orderList: this.$store.state.orderList,
      // 控制轮播框架的高度是否固定
      isFixedUnpaid: false, // 未支付页
      isFixedPaid: false, // 已支付页
      // 轮播项的索引
      swipeItemIndex: 0,
      // 已支付的订单列表
      paidOrderList: this.$store.state.paidOrderList,
      // 控制确认订单对话框的展示与隐藏
      showConfirmDialog: false
    }
  },
  created() {
    this.setSinglePageKey()
    this.getSinglePageKey()
    this.handleOrderList()
    this.getAmountPre('order')
    this.getAmountSuf('order')
  },
  mounted() {
    this.ctrlActionSheet()
    // this.setIsFixedUnpaid()
    // this.setIsFixedPaid()
    // 刷新页面时，判断轮播框架是否固定高度
    this.fixedSwipeHeight(0)
    this.releaseSwipeHeight(0)
  },
  methods: {
    ...mapMutations(['getSinglePageKey', 'getAmountPre', 'getAmountSuf']),
    // 设置验证“单页面”身份的键
    setSinglePageKey() {
      sessionStorage.removeItem('singlePageKey')
      sessionStorage.setItem('singlePageKey', 'Order')
    },
    // 将整合后的订单每一项加入到订单列表中
    handleOrderList() {
      console.log(this.$store.state.orderList)
    },
    // 展示支付动作面板
    ctrlActionSheet() {
      setTimeout(() => {
        this.showPayPopup = true
      }, 500)
    },
    // 点击订单项的商家名称，可查看对应商家页面
    toStore(item) {
      // 修改商家信息对象，为当前点击的订单项商家
      const storeInfo = {
        img: item.store_img,
        name: item.store_name,
        rating: item.store_rating,
        delivery: item.store_delivery
      }
      sessionStorage.setItem('storeInfo', JSON.stringify(storeInfo))
      // 跳转时携带商家 id，根据 id 渲染对应商家内容
      this.$router.push({ path: '/store', query: { store_id: item.store_id } })
    },
    // 轮播框架的高度是否固定？《第一种解决方案》
    // // 设置轮播框架的高度是否固定。
    // setIsFixedUnpaid() {
    //   if (this.orderList.length) {
    //     // 当订单列表高度超过 “一个页面高度” 时，轮播框架高度就不需要固定了
    //     this.isFixedUnpaid = this.$refs.orderListRef.clientHeight < 491.125
    //     console.log(this.isFixedUnpaid, '未支付轮播框架是否要固定高度')
    //   } else {
    //     // 订单列表为空时，要保持轮播滑动，就要保持轮播框架有高度
    //     this.isFixedUnpaid = !this.orderList.length
    //   }
    // },
    // setIsFixedPaid() {
    //   if (this.paidOrderList.length) {
    //     // 当订单列表高度超过 “一个页面高度” 时，轮播框架高度就不需要固定了
    //     this.isFixedPaid = this.$refs.paidOrderListRef.clientHeight < 491.125
    //     console.log(this.isFixedPaid, '已支付轮播框架是否要固定高度')
    //   } else {
    //     // 订单列表为空时，要保持轮播滑动，就要保持轮播框架有高度
    //     this.isFixedPaid = !this.paidOrderList.length
    //   }
    // },
    // 取消订单
    cancelOrder(item) {
      this.$dialog
        .confirm({
          message: '您确认取消订单吗？',
          width: 240
        })
        .then(() => {
          const index = this.orderList.findIndex((x) => x.id === item.id)
          if (index !== -1) {
            this.orderList.splice(index, 1)
            this.$toast({
              message: '取消订单成功~'
            })
            // 合计减去取消的数额
            this.$store.commit('subOrderAmount', item.store_amount)
            // 刷新页面，相减结果赋值后渲染
            setTimeout(() => {
              location.reload()
            }, 1000)
          }
        })
        .catch((err) => err)
    },
    // 切换订单
    toggleOrder() {
      // 根据订单状态不同，切换跳转方向也不同
      if (!this.swipeItemIndex) {
        return this.$refs.orderSwipeRef.next()
      }
      // 切换到上一张轮播项
      this.$refs.orderSwipeRef.prev()
    },
    // 监听订单轮播项切换事件
    orderSwipeChange(index) {
      this.showPayPopup = false
      setTimeout(() => {
        this.showPayPopup = true
        // 通过轮播项索引，可判断当前是哪一项。不延迟赋值的话，文字就会先于弹出层改变。
        this.swipeItemIndex = index
      }, 500)
      // 利用切换时，index 变化的特点；调用以下两个函数，判断轮播框架是否需要固定高度。
      this.fixedSwipeHeight(index)
      this.releaseSwipeHeight(index)
    },
    // 支付订单商品
    payOrderGoods() {
      if (!this.orderList.length) {
        return this.$toast({
          message: '您还未下单喔~'
        })
      }
      // 调出确认对话框
      this.showConfirmDialog = true
    },
    // 清空已支付的订单
    clearOrderGoods() {
      if (!this.paidOrderList.length) {
        return this.$toast({
          message: '无需清空呢~'
        })
      }
      this.showConfirmDialog = true
    },
    // 确认对话框，包含支付订单、清空订单逻辑
    confirmDialog() {
      if (!this.swipeItemIndex) {
        // 将未支付列表加入到已支付列表中
        this.$store.commit('setPaidOrderList', this.orderList)
        // 清空未支付的订单
        this.$store.commit('clearUnpaid')
        console.log(this.paidOrderList.length)
        return this.$toast.success({
          message: '支付成功~'
        })
      }
      // 到这说明处于索引为1的轮播项，执行清空已支付订单逻辑
      this.$store.commit('clearPaid')
      return this.$toast.success({
        message: '已清空~'
      })
    },
    // 轮播框架的高度是否固定？《第二种解决方案》
    // 固定轮播框架的高度
    fixedSwipeHeight(index) {
      const swipe = document.getElementById('van-swipe')
      // 每次切换，判断 van-list 元素的长度，小于一定长度就要固定轮播框架的高度；大于一定长度就不固定长度。
      // 若不固定，两个长度不一样的 swipe-item 项，就会相互影响。
      if (swipe.children[0].children[index].children[0].children[0].children.length < 5 + 1) {
        swipe.style.height = '100%'
      }
    },
    // 释放轮播框架的高度
    releaseSwipeHeight(index) {
      const swipe = document.getElementById('van-swipe')

      if (swipe.children[0].children[index].children[0].children[0].children.length > 5) {
        swipe.style.height = ''
      }
    }
  },
  computed: {
    ...mapState(['submitGoodsOrder', 'amountPre', 'amountSuf'])
  }
}
</script>

<style lang="less" scoped>
.order-container {
  padding-top: 1.22667rem;
  padding-bottom: 260px;
  height: 100%;
  overflow: scroll;
  box-sizing: border-box;
}

// 已有第二种解决方案代替
// 轮播框架固定高度的样式 （第一种解决方案）
// .swipe-fixed-height {
//   // height: 981px;
//   background-color: pink;
// }

// 订单列表
.order-list {
  margin: 20px 20px 0 20px;
  padding: 20px 26px 30px 26px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 1px 1px 10px #ccc;
  .van-cell {
    padding: 14px 0;
    border-bottom: 1px dashed #ccc !important;
  }
  .order-item {
    display: flex;
    height: 180px;
    // background-color: #ccc;
    .order-item-img {
      position: relative;
      width: 180px;
      // background-color: orange;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 92%;
        height: 92%;
        border-radius: 15px;
        transform: translate(-50%, -50%);
      }
    }
    .order-item-info {
      // flex: 7;
      display: flex;
      padding-left: 16px;
      // background-color: skyblue;
      color: #333;
      flex-direction: column;
      .store-name {
        padding: 16px 0 2px 0;
        // background-color: purple;
        h3 {
          float: left;
          margin-right: 4px;
          font-size: 34px;
          letter-spacing: 2px;
        }
        .van-icon {
          color: #bbb;
          font-size: 26px;
        }
      }
      .goods-info {
        // background-color: darkkhaki;
        p {
          width: 180px;
          color: #999;
          font-size: 24px;
          line-height: 1.4;
        }
      }
    }
    .order-item-price {
      flex: 4;
      position: relative;
      // background-color: green;
      color: #333;
      h3 {
        position: absolute;
        top: 20px;
        right: 0;
        font-size: 36px;
        color: #ffa500;
        span {
          font-size: 26px;
          font-weight: 700;
        }
      }
      .opt {
        position: absolute;
        right: 0;
        bottom: 12px;
        .van-button {
          padding: 30px 20px;
          height: 60px;
          background-color: #fff;
          color: #666;
          font-size: 25px;
          // font-weight: 700;
          border: 1px solid #bbb;
          border-radius: 30px;
          letter-spacing: 1px;
        }
        .opt-remind {
          margin-right: 6px;
        }
      }
    }
  }
}

// 页面空状态
.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /deep/ .van-empty__image {
    width: 62%;
    height: 62%;
  }
  /deep/ .van-empty__description {
    padding: 0;
  }
}

// 支付弹出层
.van-popup {
  padding-bottom: 100px;
  box-shadow: 0 -1px 10px #ccc;
  z-index: 1 !important;
}

.pay-popup {
  display: flex;
  padding: 20px 30px;
  height: 100px;
  // background-color: skyblue;

  // 三大部分的按钮公共样式
  .amount-all .van-button,
  .toggle .van-button,
  .pay-clear .van-button {
    position: absolute;
    top: 50%;
    // padding: 0 40px;
    background-color: #0063b1;
    border: none;
    transform: translate(0, -50%);
    p {
      color: #fff;
      font-size: 32px;
      font-weight: 700;
    }
  }
  .amount-all {
    flex: 5;
    position: relative;
    // background-color: orange;
    .amount {
      position: relative;
      width: 100%;
      height: 100%;
      // background-color: #0063b1;
      color: #333;
      p {
        position: absolute;
        top: 50%;
        font-size: 36px;
        transform: translate(0, -50%);
        letter-spacing: 4px;
      }
      > span {
        position: absolute;
        top: 50%;
        left: 104px;
        padding-top: 12px;
        font-size: 30px;
        transform: translate(0, -50%);
      }
      h3 {
        position: absolute;
        top: 50%;
        left: 132px;
        padding-top: 10px;
        font-size: 50px;
        transform: translate(0, -50%);
        span {
          font-size: 40px;
        }
      }
    }
    .van-button {
      padding: 0 16px;
      background-color: #fff;
      border: 1px solid #999;
      border-radius: 30px;
      p {
        color: #333;
      }
    }
  }
  .toggle {
    flex: 3;
    position: relative;
    // background-color: pink;
    .van-button {
      right: 0;
      padding: 0 6px 0 16px;
      background-color: #fff;
      border: 1px solid #999;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
      p {
        color: #333;
      }
    }
  }
  .pay-clear {
    position: relative;
    width: 26%;
    // background-color: green;
    .van-button {
      left: 3px;
      padding: 0 26px 0 16px;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
    }
  }
}

// 确认弹出框样式
/deep/ .van-dialog {
  padding: 0 20px;
  width: 62%;
  box-sizing: border-box;
  // .van-dialog__header {
  //   padding: 30px 0 10px 0;
  // }
}
.msg {
  position: relative;
  // padding: 120px 46px;
  height: 260px;
  // background-color: #eee;
  color: #333;
  border-bottom: 1px dashed #ccc;
  .msg-title {
    position: absolute;
    top: 30px;
    left: 20px;
    font-size: 30px;
    font-weight: 700;
    color: #999;
    // background-color: pink;
  }
  h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 60px;
    // background-color: skyblue;
    transform: translate(-50%);
    span {
      font-size: 46px;
    }
  }
  .msg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 324px;
    font-size: 36px;
    // background-color: pink;
    transform: translate(-50%, -20%);
  }
}
</style>
