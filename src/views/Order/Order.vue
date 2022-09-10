<template>
  <div class="order-container">
    <div>order</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Order',
  created() {
    this.setSinglePageKey()
    this.getSinglePageKey()
    this.getSubmitGoodsOrder()
  },
  methods: {
    ...mapMutations(['getSinglePageKey']),
    // 设置验证“单页面”身份的键
    setSinglePageKey() {
      sessionStorage.removeItem('singlePageKey')
      sessionStorage.setItem('singlePageKey', 'Order')
    },
    // 拿到商家页，用户点击提交订单，携带过来的商品订单信息
    getSubmitGoodsOrder() {
      return console.log(this.$store.state.submitGoodsOrder)
    }
  }
}
</script>

<style lang="less" scoped>
.order-container {
  padding-top: 1.22667rem;
  padding-bottom: 1.33333rem;
}
</style>
