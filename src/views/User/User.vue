<template>
  <div class="user-container">
    <!-- 用户区域：已登录状态 -->
    <div class="user" v-if="userInfo.avatarColor !== ''">
      <!-- 头像区域 -->
      <div class="avatar">
        <van-button :color="userInfo.avatarColor" class="btn_avatar">Hi</van-button>
      </div>
      <!-- 用户信息区域 -->
      <div class="user-info">
        <h3>{{ userInfo.username }}</h3>
        <p class="id">id：{{ userInfo.user_id }}</p>
        <p class="address">收货地址：快乐星球开心王国知足常乐小区</p>
      </div>
      <!-- 右侧箭头区域 -->
      <div class="right">
        <p class="arrow">›</p>
      </div>
    </div>
    <!-- 用户区域：未登录状态 -->
    <div class="user" v-else>
      <h2 class="login-tips">早上好！欢迎登录</h2>
    </div>

    <!-- 用户浏览历史等区域 -->
    <div class="header">
      <div class="history">
        <van-icon name="bag-o" color="#089CFF" />
        <p>{{ serviceList.footprint }}</p>
      </div>
      <div class="Collection">
        <van-icon name="like-o" color="red" />
        <p>{{ serviceList.collection }}</p>
      </div>
      <div class="subscribe">
        <van-icon name="notes-o" color="green" />
        <p>{{ serviceList.subscribe }}</p>
      </div>
    </div>

    <!-- 用户信息服务区域 -->
    <div class="service">
      <div class="list">
        <div class="list-cell">
          <p class="left"><van-icon name="paid" color="brown" />{{ serviceList.pay }}</p>
          <p class="right">›</p>
        </div>
        <div class="list-cell">
          <p class="left"><van-icon name="records" color="#99C78E" />{{ serviceList.order }}</p>
          <p class="right">›</p>
        </div>
        <div class="list-cell">
          <p class="left"><van-icon name="discount" color="#0063B1" />{{ serviceList.ticket }}</p>
          <p class="right">›</p>
        </div>
      </div>
    </div>

    <!-- 更多服务区域 -->
    <div class="more">
      <div class="list">
        <div class="list-cell">
          <p class="left"><van-icon name="points" color="#FAC85B" />{{ serviceList.market }}</p>
          <p class="right">›</p>
        </div>
        <div class="list-cell">
          <p class="left"><van-icon name="question-o" color="#9E80B3" />{{ serviceList.questionnaire }}</p>
          <p class="right">›</p>
        </div>
        <div class="list-cell">
          <p class="left"><van-icon name="thumb-circle-o" color="#FF537A" />{{ serviceList.more }}</p>
          <p class="right">›</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getServiceListAPI } from '@/apis/userAPI.js'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'User',
  data() {
    return {
      // 服务列表
      serviceList: {}
    }
  },
  created() {
    this.getServiceList()
    this.setSinglePageKey()
    this.getSinglePageKey()
  },
  methods: {
    ...mapMutations(['getSinglePageKey']),
    // 设置验证“单页面”身份的键
    setSinglePageKey() {
      sessionStorage.removeItem('singlePageKey')
      sessionStorage.setItem('singlePageKey', 'User')
    },
    // 获取服务列表
    async getServiceList() {
      const { data: res } = await getServiceListAPI()
      this.serviceList = res.data
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="less" scoped>
.user-container {
  padding-top: 1.22667rem;
  padding-bottom: 1.33333rem;
  // height: 100%;
  // box-sizing: border-box;
}

.user {
  display: flex;
  margin-bottom: 20px;
  height: 250px;
  background-color: #0063b1;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  justify-content: space-between;
  align-items: center;
  .avatar {
    flex: 3;
    position: relative;
    height: 200px;
    // background-color: pink;
    .btn_avatar {
      position: absolute;
      top: 20px;
      left: 40px;
      margin: 0;
      padding: 0;
      width: 160px;
      height: 160px;
      color: #fff;
      font-size: 60px;
      border: none;
      border-radius: 50%;
      border: 6px solid #fff !important;
    }
  }
  .user-info {
    flex: 6;
    display: flex;
    padding-top: 32px;
    height: 200px;
    // background-color: green;
    color: #fff;
    flex-direction: column;
    box-sizing: border-box;
    h3 {
      margin: 0 0 12px 0;
      padding: 0;
      font-size: 42px;
      font-weight: 400;
    }
    p {
      margin: 2px 0;
      padding: 0;
      width: 400px;
      font-size: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .right {
    flex: 1;
    position: relative;
    height: 200px;
    // background-color: orange;
    .arrow {
      position: absolute;
      top: 60px;
      left: 18px;
      font-size: 60px;
      color: #fff;
    }
  }
  // 未登录时展示的 登录提示 的样式
  .login-tips {
    margin: 0 auto;
    color: #fff;
    font-size: 50px;
    letter-spacing: 6px;
  }
}

.header {
  display: flex;
  margin: 0 12px 20px 12px;
  height: 150px;
  min-height: 31.5%;
  background-color: #fff;
  border-radius: 15px;
  justify-content: space-around;
  align-items: center;
  div {
    display: flex;
    padding: 0 40px;
    width: 160px;
    height: 90%;
    // background-color: pink;
    color: #333;
    border-right: 3px dashed #999;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  div:last-child {
    border: 0;
  }
  .van-icon {
    font-size: 60px;
  }
  p {
    margin-top: 14px;
    font-size: 25px;
    letter-spacing: 4px;
  }
}

.service,
.more {
  margin: 0 12px 20px 12px;
  background-color: #fff;
  border-radius: 15px;
  .list-cell {
    display: flex;
    padding: 24px 66px;
    height: 20%;
    // background-color: orange;
    border-bottom: 1px solid #eee;
    color: #333;
    font-size: 34px;
    justify-content: space-between;
    .left {
      letter-spacing: 4px;
      .van-icon {
        margin-right: 26px;
        font-size: 42px;
      }
    }
    .right {
      color: #999;
      font-size: 40px;
    }
  }
  .list-cell:last-child {
    border: 0;
  }
}
</style>
