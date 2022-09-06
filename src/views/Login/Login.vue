<template>
  <div class="login-container">
    <!-- 公共返回组件 -->
    <HeaderBack></HeaderBack>

    <!-- 公共页面样式组件 -->
    <CommonPage>
      <!-- 标题区域 -->
      <template slot="slot-title">
        <div class="slot-title">
          <h3>欢迎回来~</h3>
        </div>
      </template>

      <!-- 表单区域 -->
      <template slot="slot-form">
        <div class="slot-form">
          <van-form ref="loginFormRef">
            <!-- 用户名 -->
            <van-field v-model="loginForm.username" name="username" label="用户名" placeholder="请输入用户名" :rules="loginFormRules.username" :maxlength="8" ref="usernameRef" />
            <!-- 密码 -->
            <van-field v-model="loginForm.password" type="password" name="密码" label="密码" placeholder="请输入密码" :rules="loginFormRules.password" :maxlength="18" ref="passwordRef" />
            <!-- 验证码 -->
            <van-field v-model="loginForm.code" type="text" name="验证码" label="验证码" placeholder="请输入验证码" :rules="loginFormRules.code" :maxlength="4" ref="codeRef" />
            <!-- 表单按钮区域 -->
            <div class="form-btn">
              <!-- 验证码展示区 -->
              <div class="btn-code">
                <Code></Code>
              </div>
              <!-- 注册按钮 -->
              <div class="btn-register">
                <van-button block to="/register">去注册</van-button>
              </div>
              <!-- 登录按钮 -->
              <div class="btn-login">
                <van-button block native-type="submit" @click="postLoginInfo">登录</van-button>
              </div>
            </div>
          </van-form>
        </div>
      </template>
    </CommonPage>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Code from '@/components/Code/Code.vue'
import CommonPage from '@/components/CommonPage/CommonPage.vue'
import HeaderBack from '@/components/HeaderBack/HeaderBack.vue'
import { postLoginInfoAPI } from '@/apis/loginAPI.js'
export default {
  name: 'Login',
  data() {
    return {
      // 登录表单参数
      loginForm: {
        username: '夏天的风', // 用户名
        password: 'summer123', // 密码
        code: '' // 验证码
      },
      // 登录表单校验规则
      loginFormRules: {
        username: [
          { required: true, message: '输入用户名喔', trigger: 'onBlur' },
          { validator: this.usernameValid, message: '长度在 3 到 6 个字符', trigger: 'onBlur' },
          { validator: this.usernameExistValid, message: '登录失败，您可能还未注册喔' }
        ],
        password: [
          { required: true, message: '输入密码喔', trigger: 'onBlur' },
          { validator: this.passwordValid, message: '长度在 6 到 15 个字符', trigger: 'onBlur' },
          { validator: this.passwordErrorValid, message: '密码错误啦' }
        ],
        code: [
          { required: true, message: '输入验证码喔', trigger: 'onBlur' },
          { validator: this.codeValid, message: '请输入 4 位数验证码', trigger: 'onBlur' },
          { validator: this.codeErrorValid, message: '验证码不正确喔' }
        ]
      },
      // 确认注册返回的信息字符串
      logValidMessage: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(['getCodeValue', 'shareUserInfo']),
    // 表单验证函数
    usernameExistValid() {
      if (this.logValidMessage === '登录失败，您可能还未注册喔') {
        this.logValidMessage = ''
        return false
      }
      return true
    },
    passwordErrorValid() {
      if (this.logValidMessage === '密码错误啦') {
        this.logValidMessage = ''
        return false
      }
      return true
    },
    codeErrorValid() {
      if (this.loginForm.code !== this.codeValue) {
        return false
      }
      return true
    },
    usernameValid() {
      if (this.loginForm.username.length <= 3 || this.loginForm.username.length > 6) {
        return false
      }
      return true
    },
    passwordValid() {
      if (this.loginForm.password.length <= 6 || this.loginForm.password.length > 15) {
        return false
      }
      return true
    },
    codeValid() {
      if (this.loginForm.code.length < 4) {
        return false
      }
      return true
    },
    // 登录操作
    postLoginInfo() {
      // 确认登录时，再次进行表单校验
      this.$refs.loginFormRef
        .validate()
        .then(async () => {
          const { data: res } = await postLoginInfoAPI(this.loginForm)
          // 判断验证码是否输入正确，模拟返回值
          // if (this.loginForm.code !== this.codeValue) {
          //   res.data = {}
          //   res.meta.msg = '验证码不正确喔'
          //   res.meta.status = '400'
          //   return console.log(res)
          // }
          // 判断手机号和用户名是否已注册
          this.logValidMessage = res.message
          // 根据响应回来的数据再次校验表单内容
          await this.$refs.loginFormRef.validate()
          // 登录成功的逻辑
          console.log(res, '登录成功')
          const token = res.token
          sessionStorage.setItem('token', token)
          // 存储头像背景色值
          this.shareUserInfo(res)
          // 登录成功的轻提示
          this.$toast.success({
            message: '登录成功'
          })
          // 登录后跳转 (还需在 router.js 中控制访问权限)
          this.$router.push('/home')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    // 共享的验证码的值
    ...mapState(['codeValue'])
  },
  components: {
    HeaderBack,
    CommonPage,
    Code
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
}

.slot-title {
  h3 {
    font-size: 70px;
    letter-spacing: 10px;
  }
}

/* .banner {
  position: absolute;
  margin-bottom: 20px;
  width: 100%;
  // height: 420px;
  height: 32%;
  background-color: #0063b1;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: #fff;
  text-align: center;
  .title {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translate(0, -50%);
    h3 {
      font-size: 70px;
      letter-spacing: 10px;
    }
  }
} */

/* .banner {
  position: absolute;
  margin-bottom: 20px;
  width: 100%;
  // height: 420px;
  height: 32%;
  background-color: #0063b1;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: #fff;
  text-align: center;
  .title {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translate(0, -50%);
    h3 {
      font-size: 70px;
      letter-spacing: 10px;
    }
  }
} */

// 公共表单组件样式
// 表单组件的高度
// @form-box-height: 50%;
// 表单头部的高度
// @form-box-header-height: 16%;
// 表单主体的高度 (除去表单头部高度 和 自身padding-bottom的高度)
// @main-height: 100% - @form-box-header-height - (@form-box-header-height / 2);
/* .form-box {
  position: absolute;
  top: 24%;
  left: 50%;
  width: 90%;
  min-height: @form-box-height;
  // background-color: #a0c6e8;
  background-color: #fff;
  border-radius: 60px;
  transform: translate(-50%, 0);
  .form-box-header {
    position: absolute;
    width: 100%;
    height: @form-box-header-height;
    background-color: #eee;
    border-top-left-radius: 60px;
    border-top-right-radius: 60px;
  }
  .form-box-main {
    position: absolute;
    top: @form-box-header-height;
    // 表单主体的padding-bottom为：表单头部高度的一半
    padding-bottom: (@form-box-header-height / 2);
    width: 100%;
    min-height: @main-height;
    background-color: #0063b1;
    border-bottom-left-radius: 60px;
    border-bottom-right-radius: 60px;
  }
} */

.slot-form {
  .van-form {
    margin-top: 420px;
    .form-btn {
      display: flex;
      margin: 66px 30px 0;
      justify-content: space-between;
      .van-button {
        font-size: 40px;
        letter-spacing: 6px;
      }
      .btn-login {
        .van-button {
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
        }
      }
      .btn-register {
        margin-left: 130px;
        .van-button {
          color: #fff;
          background-color: #0063b1;
          border-top-left-radius: 50px;
          border-bottom-left-radius: 50px;
        }
      }
    }
    .van-cell {
      margin-bottom: 20px;
      height: 100px;
      background-color: #0063b1;
      font-size: 34px;
      font-weight: 700;
      align-items: center;
    }
    .van-field {
      /deep/ .van-field__error-message {
        position: absolute;
        top: 0;
        right: 0;
      }
      /deep/ .van-field__control {
        color: #fff;
      }
      // 修改 placeholder 字体颜色 (以下只设置兼容 webkit 内核浏览器)
      ::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #fff;
      }
    }
  }
}
</style>
