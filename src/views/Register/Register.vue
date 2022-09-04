<template>
  <div class="register-container">
    <!-- 公共返回组件 -->
    <HeaderBack></HeaderBack>

    <!-- 公共页面样式组件 -->
    <CommonPage>
      <!-- 标题区域 -->
      <template slot="slot-title">
        <div class="slot-title">
          <h3>欢迎加入我们~</h3>
        </div>
      </template>

      <!-- 表单区域 -->
      <template slot="slot-form">
        <div class="slot-form">
          <van-form ref="registerFormRef">
            <!-- 手机号 -->
            <van-field v-model="registerForm.mobile" type="digit" name="mobile" label="手机号" placeholder="请输入手机号" :rules="registerFormRules.mobile" :maxlength="11" ref="mobileRef" />
            <!-- 用户名 -->
            <van-field v-model="registerForm.username" name="username" label="用户名" placeholder="请输入用户名" :rules="registerFormRules.username" :maxlength="13" ref="usernameRef" />
            <!-- 密码 -->
            <van-field v-model="registerForm.password" type="password" name="密码" label="密码" placeholder="请输入密码" :rules="registerFormRules.password" :maxlength="18" ref="passwordRef" />
            <!-- 验证码 -->
            <van-field v-model="registerForm.code" type="digit" name="验证码" label="验证码" placeholder="请输入验证码" :rules="registerFormRules.code" :maxlength="4" ref="codeRef" />
            <!-- 表单按钮区域 -->
            <div class="form-btn">
              <!-- 验证码展示区 -->
              <div class="btn-code">
                <!-- <img :src="codeImg" alt="" /> -->
                <Code></Code>
              </div>
              <!-- 登录按钮 -->
              <div class="btn-login">
                <van-button block to="/login">去登录</van-button>
              </div>
              <!-- 注册按钮 -->
              <div class="btn-register">
                <van-button block native-type="submit" @click="postRegisterInfo">注册</van-button>
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
// import { setCookie, getCookie } from '@/utils/cookie.js'
import Code from '@/components/Code/Code.vue'
import CommonPage from '@/components/CommonPage/CommonPage.vue'
import HeaderBack from '@/components/HeaderBack/HeaderBack.vue'
import { postRegisterInfoAPI } from '@/apis/registerAPI.js'
export default {
  name: 'Register',
  data() {
    return {
      // 注册表单参数
      registerForm: {
        mobile: '', // 手机号
        username: '', // 用户名
        password: '', // 密码
        code: '' // 验证码
      },
      // 注册表单校验规则
      registerFormRules: {
        mobile: [
          { required: true, message: '输入手机号喔', trigger: 'onBlur' },
          { validator: this.mobileValid, message: '请输入正确的手机号', trigger: 'onBlur' },
          { validator: this.mobileExistValid, message: '该手机号已注册' }
        ],
        username: [
          { required: true, message: '输入用户名喔', trigger: 'onBlur' },
          { validator: this.usernameValid, message: '长度在 3 到 11 个字符', trigger: 'onBlur' },
          { validator: this.usernameExistValid, message: '用户名已存在' }
        ],
        password: [
          { required: true, message: '输入密码喔', trigger: 'onBlur' },
          { validator: this.passwordValid, message: '长度在 6 到 15 个字符', trigger: 'onBlur' }
        ],
        code: [
          { required: true, message: '输入验证码喔', trigger: 'onBlur' },
          { validator: this.codeValid, message: '请输入 4 位数验证码', trigger: 'onBlur' }
        ]
      },
      // 确认注册返回的信息字符串
      regValidMessage: '',
      // 验证码图片路径
      codeImg: '',
      // 表单校验信息，此对象的属性均为表单每一项的 name 值
      validInfo: {}
    }
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(['getCodeValue']),
    // 表单验证函数
    mobileExistValid() {
      if (this.regValidMessage === '该手机号已注册') {
        // 提交注册时，已有表单的校验会优先于 注册事件 里的表单校验；因此会拦截此校验信息。
        // 所以要 重置 注册校验信息，这样 res.message 得以赋 最新值 给注册校验信息；
        // 才能判断最新的 res.message 是'该手机号已注册'还是'用户名已存在'。
        this.regValidMessage = ''
        return false
      }
      return true
    },
    usernameExistValid() {
      if (this.regValidMessage === '用户名已存在') {
        this.regValidMessage = ''
        return false
      }
      return true
    },
    mobileValid() {
      if (this.registerForm.mobile.length < 11) {
        return false
      }
      return true
    },
    usernameValid() {
      if (this.registerForm.username.length <= 3 || this.registerForm.username.length > 11) {
        return false
      }
      return true
    },
    passwordValid() {
      if (this.registerForm.password.length <= 6 || this.registerForm.password.length > 15) {
        return false
      }
      return true
    },
    codeValid() {
      if (this.registerForm.code.length < 4) {
        return false
      }
      return true
    },
    // 注册操作
    postRegisterInfo() {
      // 确认注册时，再次进行表单校验
      this.$refs.registerFormRef
        .validate()
        .then(async () => {
          const { data: res } = await postRegisterInfoAPI(this.registerForm)
          // 判断验证码是否输入正确
          if (this.registerForm.code !== this.codeValue) {
            res.data = {}
            res.meta.msg = '验证码不正确喔'
            res.meta.status = '400'
            return console.log(res)
          }
          // 判断手机号和用户名是否已注册
          this.regValidMessage = res.message
          // 根据响应回来的数据再次校验表单内容
          await this.$refs.registerFormRef.validate()
          // 注册成功的逻辑
          console.log(res, '注册成功')
          // 注册成功的轻提示
          this.$toast({
            message: '注册成功！请登录~',
            position: 'top'
          })
          // 注册成功后跳转 (还需在 router.js 中控制访问权限)
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    // 共享的验证码的值
    ...mapState(['codeValue']),
    getValidInfo() {
      const usernameRef = this.$refs.usernameRef.name
      const passwordRef = this.$refs.passwordRef.name
      const codeRef = this.$refs.codeRef.name
      const validInfo = {
        usernameRef,
        passwordRef,
        codeRef
      }
      return validInfo
    }
  },
  components: {
    HeaderBack,
    CommonPage,
    Code
  }
}
</script>

<style lang="less" scoped>
.register-container {
  height: 100%;
}

.slot-title {
  h3 {
    font-size: 70px;
    letter-spacing: 10px;
  }
}

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
      .btn-register {
        .van-button {
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
        }
      }
      .btn-login {
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
