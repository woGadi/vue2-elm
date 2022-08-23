<template>
  <div class="header-container">
    <!-- 头部导航栏 -->
    <!-- 通过 vuex 动态展示导航栏的控件 -->
    <van-nav-bar :title="headerAttrParams.title" fixed>
      <template #left>
        <van-button v-if="headerAttrParams.loginShow">登录</van-button>
      </template>
      <template #right>
        <van-icon name="search" size="24" @click="toSearch" v-if="headerAttrParams.iconShow" />
      </template>
    </van-nav-bar>

    <!-- 搜索弹出层 -->
    <van-popup v-model="$store.state.searchPopup" position="top" :style="{ height: '90%' }" close-on-click-overlay round>
      <Search></Search>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Search from '@/components/Search/Search.vue'
export default {
  name: 'Header',
  data() {
    return {}
  },
  created() {},
  methods: {
    ...mapMutations(['showSearchPopup', 'getSinglePageKey']),
    // 点击搜索按钮，展开搜索弹出层
    toSearch() {
      // 展示搜索弹出层
      this.showSearchPopup(true)
    }
  },
  computed: {
    ...mapState(['headerAttrParams'])
  },
  components: {
    Search
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #eee;
}

.van-button {
  margin: 0;
  padding: 0;
  border: none;
  color: #fff;
  background-color: transparent;
  font-size: 0.42667rem;
}

/deep/ .van-nav-bar__text {
  font-size: 0.42667rem;
}
</style>
