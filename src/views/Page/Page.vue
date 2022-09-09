<template>
  <div class="page-container">
    <!-- 头部导航栏 -->
    <Header></Header>

    <!-- 二级组件的展示区域 -->
    <router-view></router-view>

    <!-- 底部导航栏 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  name: 'Page',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>
.page-container {
  height: 100%;
  background-color: #eee;
}
</style>
