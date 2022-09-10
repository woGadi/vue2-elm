<template>
  <div class="store-container">
    <!-- 返回组件 -->
    <HeaderBack class="HeaderBack"></HeaderBack>

    <!-- 下拉背景板 -->
    <!-- <div class="drop-down-bgc"></div> -->

    <!-- 头部横幅 -->
    <CommonPage class="CommonPage">
      <!-- 标题区域 -->
      <template slot="slot-title">
        <div class="slot-title">
          <h3>{{ storeInfo.name }}</h3>
        </div>
      </template>
    </CommonPage>

    <!-- 商家信息 -->
    <div class="store-info">
      <!-- 商家头像 -->
      <div class="store-avatar">
        <van-image width="100%" height="100%" :src="storeInfo.img" round />
      </div>
      <!-- 商家描述 -->
      <div class="store-sketch">
        <!-- 评分 -->
        <div class="rating">
          <van-rate v-model="storeInfo.rating" allow-half void-icon="star" color="orange" void-color="#eee" size="16px" gutter="0px" />
          <p class="rating-p">{{ storeInfo.rating }}</p>
        </div>
        <!-- 配送信息 -->
        <div class="delivery">
          <p>￥20起送 / {{ storeInfo.delivery }}</p>
        </div>
      </div>
    </div>

    <!-- 商品文案 -->
    <div class="title">
      <p>买点什么...</p>
    </div>

    <!-- 商品侧边导航 -->
    <div class="goods-nav">
      <van-sidebar v-model="activeKey">
        <!-- @change="goodsNavChange" -->
        <van-sidebar-item title="热销商品" @click="goodsListChange" />
        <van-sidebar-item title="快餐" @click="goodsListChange" />
        <van-sidebar-item title="家常菜" @click="goodsListChange" />
        <van-sidebar-item title="小炒" @click="goodsListChange" />
        <van-sidebar-item title="粥类" @click="goodsListChange" />
        <van-sidebar-item title="汤类" @click="goodsListChange" />
      </van-sidebar>
    </div>

    <!-- 商品浏览区域 -->
    <div class="goods-browse" id="goods-browse">
      <div class="goods-cate0" id="goods-cate0">
        <div class="goods-nav-title">
          <p>热销商品</p>
        </div>
        <van-list>
          <van-cell v-for="item in goodsListFirst" :key="item.id">
            <div class="goods">
              <div class="goods-img">
                <img :src="item.img_path" />
              </div>
              <div class="goods-text">
                <div class="name">
                  <h3>{{ item.name }}</h3>
                </div>
                <div class="rating">
                  <p>评分：{{ item.rating }} / 月售：{{ item.sale_month }}</p>
                </div>
                <div class="price">
                  <h3>￥{{ item.price }}</h3>
                  <div class="opt">
                    <van-stepper v-model="item.initCount" theme="round" button-size="20" disable-input min="0" @plus="addGoodsCount(item)" @minus="subGoodsCount(item)" />
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
      <div class="goods-cate1" id="goods-cate1">
        <div class="goods-nav-title">
          <p>快餐</p>
        </div>
        <van-list>
          <van-cell v-for="item in goodsListSecond" :key="item.id">
            <div class="goods">
              <div class="goods-img">
                <img :src="item.img_path" />
              </div>
              <div class="goods-text">
                <div class="name">
                  <h3>{{ item.name }}</h3>
                </div>
                <div class="rating">
                  <p>评分：{{ item.rating }} / 月售：{{ item.sale_month }}</p>
                </div>
                <div class="price">
                  <h3>￥{{ item.price }}</h3>
                  <div class="opt">
                    <van-stepper v-model="item.initCount" theme="round" button-size="20" disable-input min="0" @plus="addGoodsCount(item)" @minus="subGoodsCount(item)" />
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
      <div class="goods-cate2" id="goods-cate2">
        <div class="goods-nav-title">
          <p>家常菜</p>
        </div>
        <van-list>
          <van-cell v-for="item in goodsListThird" :key="item.id">
            <div class="goods">
              <div class="goods-img">
                <img :src="item.img_path" />
              </div>
              <div class="goods-text">
                <div class="name">
                  <h3>{{ item.name }}</h3>
                </div>
                <div class="rating">
                  <p>评分：{{ item.rating }} / 月售：{{ item.sale_month }}</p>
                </div>
                <div class="price">
                  <h3>￥{{ item.price }}</h3>
                  <div class="opt">
                    <van-stepper v-model="item.initCount" theme="round" button-size="20" disable-input min="0" @plus="addGoodsCount(item)" @minus="subGoodsCount(item)" />
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
      <div class="goods-cate3" id="goods-cate3">
        <div class="goods-nav-title">
          <p>小炒</p>
        </div>
        <van-list>
          <van-cell v-for="item in goodsListFourth" :key="item.id">
            <div class="goods">
              <div class="goods-img">
                <img :src="item.img_path" />
              </div>
              <div class="goods-text">
                <div class="name">
                  <h3>{{ item.name }}</h3>
                </div>
                <div class="rating">
                  <p>评分：{{ item.rating }} / 月售：{{ item.sale_month }}</p>
                </div>
                <div class="price">
                  <h3>￥{{ item.price }}</h3>
                  <div class="opt">
                    <van-stepper v-model="item.initCount" theme="round" button-size="20" disable-input min="0" @plus="addGoodsCount(item)" @minus="subGoodsCount(item)" />
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
      <div class="goods-cate4" id="goods-cate4">
        <div class="goods-nav-title">
          <p>粥类</p>
        </div>
        <van-list>
          <van-cell v-for="item in goodsListFifth" :key="item.id">
            <div class="goods">
              <div class="goods-img">
                <img :src="item.img_path" />
              </div>
              <div class="goods-text">
                <div class="name">
                  <h3>{{ item.name }}</h3>
                </div>
                <div class="rating">
                  <p>评分：{{ item.rating }} / 月售：{{ item.sale_month }}</p>
                </div>
                <div class="price">
                  <h3>￥{{ item.price }}</h3>
                  <div class="opt">
                    <van-stepper v-model="item.initCount" theme="round" button-size="20" disable-input min="0" @plus="addGoodsCount(item)" @minus="subGoodsCount(item)" />
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
      <div class="goods-cate5" id="goods-cate5">
        <div class="goods-nav-title">
          <p>汤类</p>
        </div>
        <van-list>
          <van-cell v-for="item in goodsListSixth" :key="item.id">
            <div class="goods">
              <div class="goods-img">
                <img :src="item.img_path" />
              </div>
              <div class="goods-text">
                <div class="name">
                  <h3>{{ item.name }}</h3>
                </div>
                <div class="rating">
                  <p>评分：{{ item.rating }} / 月售：{{ item.sale_month }}</p>
                </div>
                <div class="price">
                  <h3>￥{{ item.price }}</h3>
                  <div class="opt">
                    <van-stepper v-model="item.initCount" theme="round" button-size="20" disable-input min="0" @plus="addGoodsCount(item)" @minus="subGoodsCount(item)" />
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
    </div>

    <!-- 商品区域
    <div class="goods">
      <div class="main"></div>
    </div> -->

    <!-- 底部页面导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartList.length" color="#FF9819" @click="ctrlActionSheet" />
      <div class="count">
        <h3>
          ￥{{ amountPre }}.<span>{{ amountSuf }}</span>
        </h3>
      </div>
      <van-goods-action-button text="提交订单" color="#0063b1" @click="sendCartList" />
    </van-goods-action>

    <!-- 购物车动作面板 -->
    <van-action-sheet v-model="showActionSheet" title="看看购物车...">
      <div class="cart">
        <van-list>
          <van-cell v-for="item in cartList" :key="item.id">
            <div class="cart-goods">
              <div class="cart-goods-img">
                <img :src="item.img_path" />
              </div>
              <div class="cart-goods-text">
                <div class="name">
                  <h3>{{ item.name }}</h3>
                </div>
                <div class="price">
                  <h3>￥{{ item.price }}</h3>
                  <div class="opt">
                    <van-stepper v-model="item.initCount" theme="round" button-size="20" disable-input min="0" @plus="addGoodsCount(item)" @minus="subGoodsCount(item)" />
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
    </van-action-sheet>

    <!-- <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="green" />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="6" color="#FF9819" />
      <van-goods-action-icon icon="like-o" text="收藏" color="red" />
      <van-goods-action-button text="放入购物车" color="#0063b1" />
    </van-goods-action> -->
  </div>
</template>

<script>
import { getGoodsListAPI } from '@/apis/storeAPI.js'
import HeaderBack from '@/components/HeaderBack/HeaderBack.vue'
import CommonPage from '@/components/CommonPage/CommonPage.vue'
export default {
  name: 'Store',
  data() {
    return {
      // 商家信息对象
      storeInfo: {},
      // 侧边导航的索引
      activeKey: 0,
      // activeIndex: 0
      // 商品分类列表，共6类
      goodsListFirst: [],
      goodsListSecond: [],
      goodsListThird: [],
      goodsListFourth: [],
      goodsListFifth: [],
      goodsListSixth: [],
      // 商品总金额整数部分
      amountPre: 0,
      // 商品总金额小数部分
      amountSuf: 0,
      // 控制动作面板的展示与隐藏
      showActionSheet: false,
      // 购物车列表
      cartList: []
    }
  },
  created() {
    this.getStoreInfo()
    this.getGoodsList()
    sessionStorage.setItem('storeAmount', '0')
    this.getAmountSuf()
  },
  methods: {
    // 获取商家信息
    getStoreInfo() {
      const storeInfo = JSON.parse(sessionStorage.getItem('storeInfo'))
      this.storeInfo = storeInfo
      // console.log(this.storeInfo)
    },
    // 获取商品列表
    async getGoodsList() {
      const { data: res } = await getGoodsListAPI()
      // 商品分类列表，共6类
      this.goodsListFirst = res.data_1
      this.goodsListSecond = res.data_2
      this.goodsListThird = res.data_3
      this.goodsListFourth = res.data_4
      this.goodsListFifth = res.data_5
      this.goodsListSixth = res.data_6
    },
    // 商品列表跟随侧边导航跳转
    goodsListChange(index) {
      document.getElementById(`goods-cate${index}`).scrollIntoView()
      // const goodsCate = document.getElementById(`goods-cate${index}`)
      // const target = goodsCate.offsetTop
    },
    // 点击+号时，商品页面总金额变化
    addGoodsCount(item) {
      const addParams = {
        type: 'add',
        price: item.price
      }
      this.$store.commit('setStoreAmount', addParams)
      this.getAmountPre()
      this.getAmountSuf()
      // 购物车面板逻辑
      this.addGoodsCart(item)
    },
    // 点击-号时，商品页面总金额变化
    subGoodsCount(item) {
      const subParams = {
        type: 'sub',
        price: item.price
      }
      this.$store.commit('setStoreAmount', subParams)
      this.getAmountPre()
      this.getAmountSuf()
      // 购物车面板逻辑
      this.subGoodsCart(item)
    },
    // 获取商品总金额整数部分
    getAmountPre() {
      this.amountPre = sessionStorage.getItem('storeAmount').slice(0, -3) - 0
    },
    // 获取商品总金额小数部分
    getAmountSuf() {
      let amountSuf = sessionStorage.getItem('storeAmount').slice(-2) - 0
      this.amountSuf = amountSuf < 10 ? '0' + amountSuf : amountSuf
    },
    // 控制动作面板的展示与隐藏
    ctrlActionSheet() {
      this.showActionSheet = !this.showActionSheet
    },
    // 点击 + 按钮，获取购物车商品渲染所需的信息
    addGoodsCart(item) {
      // 购物车面板逻辑
      // 找到重复项返回 true
      const repeatItem = this.cartList.some((x) => x.id === item.id)
      if (repeatItem) {
        // 找到重复项在数组中的位置
        const repeatItemIndex = this.cartList.findIndex((i) => i.id === item.id)
        console.log(repeatItemIndex, 'ceshi')
        // 重复项无需 push 进数组，而是更新一下重复项数据即可
        this.cartList.splice(repeatItemIndex, 1, item)
        return console.log(this.cartList)
      }
      // 将新的项 push 进数组
      this.cartList.push(item)
    },
    // 点击 - 按钮，当选择商品数量为 0 时，将此商品移出购物车
    subGoodsCart(item) {
      if (item.initCount - 1 === 0) {
        const itemIndex = this.cartList.findIndex((i) => i.id === item.id)
        this.cartList.splice(itemIndex, 1)
        item.initCount = 0
      }
    },
    // 点击提交订单按钮，将购物车列表传给 vuex，让其共享给订单页
    sendCartList() {
      if (this.cartList.length === 0) {
        return this.$toast({
          message: '购物车空空如也~',
          position: 'bottom'
        })
      }
      this.$store.commit('setSubmitGoodsOrder', this.cartList)
      this.$toast.success({
        message: '提交订单成功~'
      })
    }
    // 上面
  },
  components: {
    HeaderBack,
    CommonPage
  }
}
</script>

<style lang="less" scoped>
.store-container {
  padding-bottom: 126px;
  height: @goods-nav-height;
  // overflow: hidden;
}

.HeaderBack {
  position: absolute;
  top: 0;
}

// .drop-down-bgc {
//   position: absolute;
//   top: -31%;
//   // margin-top: -55%;
//   // padding-top: 55.5%;
//   width: 100%;
//   height: 69%;
//   // background-color: pink;
//   // background-color: #0063b1;
//   border-bottom-left-radius: 15px;
//   border-bottom-right-radius: 15px;
// }

.slot-title {
  h3 {
    font-size: 70px;
    letter-spacing: 6px;
  }
}

.store-info {
  position: absolute;
  top: 26.5%;
  left: 3%;
  display: flex;
  width: 90%;
  height: 15%;
  // background-color: #ddd;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  .store-avatar {
    // position: absolute;
    // top: 26.5%;
    // left: 3%;
    width: 219px;
    height: 219px;
    background-color: #0063b1;
    border: 10px solid #0063b1;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .store-sketch {
    display: flex;
    width: 67%;
    height: 46%;
    // background-color: #333;
    flex-direction: column;
    .rating {
      flex: 3;
      position: relative;
      // background-color: red;
      .rating-p {
        position: absolute;
        top: 5%;
        left: 38%;
        color: #ffa500;
      }
    }
    .delivery {
      flex: 3;
      // background-color: orange;
      color: #fff;
    }
    p {
      font-size: 30px;
      font-weight: 700;
    }
  }
}

.title {
  position: absolute;
  top: 39.5%;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0 1px 10px #ccc;
  z-index: 1;
  p {
    position: absolute;
    top: 10%;
    right: 4%;
    color: #999;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 3px;
  }
}
// 这里
@goods-nav-height: 83%;
// @goods-nav-height: 960px;
.goods-nav {
  position: absolute;
  top: 43%;
  width: 24%;
  // height: 72%;
  height: @goods-nav-height;
  background-color: #f7f8fa;
  border-bottom-left-radius: 15px;
  .van-sidebar {
    text-align: center;
    letter-spacing: 1px;
  }
}

.goods-browse {
  position: absolute;
  top: 43%;
  right: 0;
  padding-bottom: 100%;
  width: 76%;
  height: @goods-nav-height;
  background-color: #f7f8fa;
  border-bottom-right-radius: 15px;
  box-sizing: border-box;
  overflow: scroll;
  // div {
  //   height: 500px;
  //   width: 100%;
  //   background-color: #999;
  // }
  .goods-nav-title {
    margin-left: 10px;
    height: 60px;
    background-color: #fff;
    p {
      margin: 0 auto;
      width: 29%;
      height: 100%;
      color: #0063b1;
      font-size: 30px;
      font-weight: 700;
      text-align: center;
      line-height: 2;
      border-bottom: 5px solid #0063b1;
      box-sizing: border-box;
    }
  }
  .van-cell {
    padding: 26px 10px;
    border-bottom: 1px dashed #ccc;
  }
  .goods {
    display: flex;
    height: 165px;
    // background-color: #ddd;
    .goods-img {
      flex: 3;
      // background-color: pink;
      border-radius: 15px;
      img {
        width: 100%;
        border-radius: 15px;
      }
    }
    .goods-text {
      flex: 7;
      display: flex;
      // background-color: orange;
      flex-direction: column;
      div {
        padding-left: 20px;
      }
      h3 {
        line-height: 2;
        letter-spacing: 1px;
      }
      .name {
        flex: 4;
        // background-color: pink;
        h3 {
          color: #333;
          font-size: 30px;
        }
      }
      .rating {
        flex: 4;
        // background-color: skyblue;
        p {
          color: #999;
          font-size: 12px;
        }
      }
      .price {
        flex: 4;
        // background-color: purple;
        h3 {
          float: left;
          font-size: 34px;
          color: #ffa500;
        }
        .opt {
          padding: 0;
          float: right;
          width: 40%;
          height: 100%;
          // background-color: #ddd;
          .van-stepper {
            padding: 10px 0 0 0;
            /deep/ .van-stepper__input {
              width: 50px;
              font-size: 30px;
              font-weight: 700;
              color: #333;
            }
          }
        }
      }
    }
  }
}

// .goods {
//   position: absolute;
//   top: 43%;
//   // padding-bottom: 126px;
//   // margin-bottom: 20px;
//   // margin-top: 70%;
//   width: 100%;
//   height: 100%;
//   background-color: pink;
//   border-bottom-left-radius: 15px;
//   border-bottom-right-radius: 15px;
//   overflow: scroll;
//   .main {
//     // padding-bottom: 126px;
//     height: 100%;
//     background-color: skyblue;
//     .goods-nav {
//       float: left;
//       width: 30%;
//       height: 100%;
//       background-color: orange;
//     }
//     .goods-browse {
//       float: right;
//       width: 66%;
//       height: 100%;
//       background-color: green;
//       .ceshi {
//         height: 500px;
//         width: 100%;
//       }
//     }
//   }
// }

// 商家页底部导航
.van-goods-action {
  box-shadow: 0 -1px 10px #ddd;
  z-index: 3;
}

.count {
  padding: 0 22px;
  width: 34%;
  height: 100%;
  // background-color: #999;
  color: #333;
  text-align: center;
  line-height: 2;
  border-left: 1px solid #ddd;
  box-sizing: border-box;
  h3 {
    font-size: 60px;
    color: #333;
    span {
      font-size: 40px;
    }
  }
}

/deep/ .van-button__text {
  font-size: 36px;
  letter-spacing: 2px;
}

// 购物车动作面板
.van-action-sheet {
  // box-shadow: 0 -1px 10px #bbb;
  z-index: 2 !important;
  .van-action-sheet__header {
    padding-left: 30px;
    color: #999;
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    letter-spacing: 2px;
  }
  .van-action-sheet__content {
    padding-bottom: 126px;
    .cart {
      max-height: 360px;
      background-color: #eee;
      overflow: scroll;
      .van-cell {
        margin: 1px 0;
        padding: 20px 60px;
      }
      .cart-goods {
        display: flex;
        height: 110px;
        .cart-goods-img {
          flex: 2;
          // background-color: pink;
          img {
            width: 100%;
            height: 100%;
            border-radius: 15px;
          }
        }
        .cart-goods-text {
          flex: 9;
          display: flex;
          // background-color: green;
          .name {
            padding: 0 10px 0 20px;
            // background-color: orange;
            line-height: 3.1;
            text-align: center;
            h3 {
              font-size: 32px;
              font-weight: 700;
            }
          }
          .price {
            flex: 7;
            display: flex;
            // background-color: skyblue;
            align-items: center;
            justify-content: space-between;
            h3 {
              font-size: 30px;
              color: #ffa500;
            }
            .opt {
              padding: 0 0 10px 0;
              border-bottom: 1px dashed #ccc;
              .van-stepper {
                padding: 10px 0 0 0;
                /deep/ .van-stepper__input {
                  width: 50px;
                  font-size: 30px;
                  font-weight: 700;
                  color: #333;
                }
              }
            }
          }
        }
      }
    }
  }
}
// 动作面板遮罩层
/deep/ .van-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2 !important;
}
</style>
