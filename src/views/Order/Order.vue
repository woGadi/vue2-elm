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
  },
  methods: {
    ...mapMutations(['getSinglePageKey']),
    // 设置验证“单页面”身份的键
    setSinglePageKey() {
      sessionStorage.removeItem('singlePageKey')
      sessionStorage.setItem('singlePageKey', 'Order')
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
