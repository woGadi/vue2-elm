<template>
  <div class="common-page-container">
    <!-- 说明：这个组件是公共页面的页面样式组件 -->

    <!-- 头部横幅 -->
    <div class="banner">
      <!-- 表单插槽 -->
      <slot name="slot-form"></slot>
    </div>

    <!-- 页面标题 -->
    <div class="title">
      <!-- 标题插槽 -->
      <slot name="slot-title"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonPage'
}
</script>

<style lang="less" scoped>
.banner {
  position: absolute;
  margin-bottom: 20px;
  padding-bottom: 60px;
  width: 100%;
  min-height: 33.5%;
  background-color: #0063b1;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  text-align: center;
}
.title {
  position: absolute;
  top: 20%;
  left: 0;
  width: 100%;
  color: #fff;
  text-align: center;
  transform: translate(0, -50%);
}
</style>
