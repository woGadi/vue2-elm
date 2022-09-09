<template>
  <div class="footer-container">
    <!-- 底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="shop-o">首页</van-tabbar-item>
      <van-tabbar-item to="/order" icon="orders-o">订单</van-tabbar-item>
      <van-tabbar-item to="/user" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="less" scoped>
.van-tabbar {
  box-shadow: 0 -1px 10px #ccc;
}
</style>
