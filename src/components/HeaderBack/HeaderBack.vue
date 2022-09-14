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
  methods: {
    // 返回上一页面
    goBack() {
      // 返回时清除存储的标题
      // sessionStorage.removeItem('cateTitle')
      // 解决了注册和登录页不能直接返回首页的问题
      const pageKey = sessionStorage.getItem('pageKey')
      if (pageKey === 'Register' || pageKey === 'Login') {
        this.$router.push('/home')
        return sessionStorage.removeItem('pageKey')
      }
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
