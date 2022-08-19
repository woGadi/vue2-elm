<template>
  <div class="header-container">
    <!-- 头部导航栏 -->
    <van-nav-bar title="首页" left-text="登录" fixed>
      <template #right>
        <van-icon name="search" size="24" @click="toSearch" />
      </template>
    </van-nav-bar>

    <!-- 搜索弹出层 -->
    <van-popup v-model="showSearchPopup" position="top" :style="{ height: '' }" close-on-click-overlay round>
      <Search></Search>
    </van-popup>
  </div>
</template>

<script>
import Search from '@/views/Search/Search.vue'
export default {
  name: 'Header',
  data() {
    return {
      showSearchPopup: false
    }
  },
  components: {
    Search
  },
  methods: {
    toSearch() {
      this.showSearchPopup = true
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  height: 90%;
  background-color: #eee;
}
</style>
