<template>
  <div class="store-details-container">
    <!-- 返回组件 -->
    <HeaderBack class="HeaderBack"></HeaderBack>

    <!-- 下拉背景板 -->
    <div class="drop-down-bgc"></div>
    <!-- 头部横幅 -->
    <CommonPage class="CommonPage"></CommonPage>

    <!-- 商品浏览区域 -->

    <!-- 底部页面导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="green" />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="6" color="#FF9819" />
      <van-goods-action-icon icon="like-o" text="收藏" color="red" />
      <van-goods-action-button text="放入购物车" color="#0063b1" />
    </van-goods-action>
  </div>
</template>

<script>
import HeaderBack from '@/components/HeaderBack/HeaderBack.vue'
import CommonPage from '@/components/CommonPage/CommonPage.vue'
export default {
  name: 'StoreDetails',
  components: {
    HeaderBack,
    CommonPage
  }
}
</script>

<style lang="less" scpoed>
.store-details-container {
  height: 100%;
}

.HeaderBack {
  position: absolute;
  top: 0;
}

.drop-down-bgc {
  position: absolute;
  top: -31%;
  // margin-top: -55%;
  // padding-top: 55.5%;
  width: 100%;
  height: 69%;
  // background-color: pink;
  background-color: #0063b1;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.van-button__text {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 2px;
}
</style>
