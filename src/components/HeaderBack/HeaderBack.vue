<template>
  <div class="header-back-container">
    <!-- 头部返回导航栏 -->
    <van-nav-bar left-arrow @click-left="goBack"></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'HeaderBack',
  data() {
    return {}
  },
  created() {},
  methods: {
    // 返回上一页面
    goBack() {
      // 返回时清除存储的标题
      // sessionStorage.removeItem('cateTitle')
      // 返回上一页面
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
// 穿透样式
.van-nav-bar {
  float: left;
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: transparent;
}
</style>
