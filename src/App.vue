<template>
  <div id="app-container">
    <!-- 头部导航栏 -->
    <Header></Header>

    <!-- 各组件的展示区域 -->
    <router-view></router-view>

    <!-- 底部导航栏 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>
#app-container {
  height: 100%;
  background-color: #eee;
}

/deep/ .van-nav-bar__text {
  font-size: 0.42667rem;
}
</style>
