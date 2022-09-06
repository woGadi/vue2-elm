<template>
  <div id="app-container">
    <!-- 一级组件的展示区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // 解决了 vuex 刷新丢失数据的问题
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="less" scoped>
#app-container {
  height: 100%;
}
</style>
