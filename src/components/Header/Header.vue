<template>
  <div class="header-container">
    <!-- 头部导航栏 -->
    <!-- 通过 vuex 动态展示导航栏的控件 -->
    <van-nav-bar :title="headerAttrParams.title" fixed>
      <template #left>
        <!-- 登录入口 -->
        <van-button v-if="headerAttrParams.loginShow" to="/login" class="btn_login">登录</van-button>
        <!-- 头像区域 -->
        <van-button v-if="headerAttrParams.avatarShow" to="/user" :color="userInfo.avatarColor" class="btn_avatar">Hi</van-button>
        <!-- 退出登录 -->
        <van-button v-if="headerAttrParams.logoutShow" class="btn_logout" @click="logout">退出</van-button>
      </template>
      <template #right>
        <van-icon name="search" size="24" @click="toSearch" v-if="headerAttrParams.searchShow" />
        <van-icon name="setting-o" size="22" v-if="headerAttrParams.settingShow" />
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
  mounted() {},
  methods: {
    ...mapMutations(['showSearchPopup', 'getSinglePageKey']),
    // 点击搜索按钮，展开搜索弹出层
    toSearch() {
      // 展示搜索弹出层
      this.showSearchPopup(true)
    },
    // 点击退出按钮，退出登录
    logout() {
      this.userInfo.avatarColor = ''
      sessionStorage.removeItem('token')
      this.$toast.success({
        message: '退出登录\n成功'
      })
      // 触发页面状态展示事件，展示出未登录状态的页面
      this.getSinglePageKey()
    }
  },
  computed: {
    ...mapState(['headerAttrParams', 'userInfo'])
    // ...mapGetters(['setAvatarColor'])
    // zhuanghua() {
    //   const userInfo = this.shareUserInfo()
    //   return userInfo
    // }
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
  font-size: 0.42667rem;
}

.btn_login,
.btn_logout {
  background-color: transparent;
}

.btn_avatar {
  width: 70px;
  height: 66px;
  border-radius: 50%;
  border: 4px solid #fff !important;
}

/deep/ .van-nav-bar__text {
  font-size: 0.42667rem;
}

/deep/ .van-nav-bar__left,
/deep/ .van-nav-bar__right {
  padding: 0 42px;
}
</style>
