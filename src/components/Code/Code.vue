<template>
  <div class="code-container">
    <canvas ref="canvasRef" id="canvas" width="100" height="46" class="codeImg" @click="changeCode"></canvas>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Code',
  data() {
    return {}
  },
  mounted() {
    this.setCodeValue()
    this.drawPic(this.codeValue)
  },
  computed: {
    ...mapState(['codeValue'])
  },
  methods: {
    ...mapMutations(['getCodeValue', 'setCodeValue']),
    // 触发“看不清楚，换一张”事件
    changeCode() {
      this.setCodeValue()
      this.drawPic(this.codeValue)
    },

    /** 生成一个随机数**/
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    /** 生成一个随机色**/
    randomColor(min, max) {
      const r = this.randomNum(min, max)
      const g = this.randomNum(min, max)
      const b = this.randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    /** 绘制验证码图片**/
    drawPic(num) {
      const canvas = document.getElementById('canvas')
      const width = canvas.width
      const height = canvas.height
      const ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      /** 绘制背景色**/
      ctx.fillStyle = this.randomColor(180, 240) // 颜色若太深可能导致看不清
      ctx.fillRect(0, 0, width, height)
      /** 绘制文字**/
      const txt = num
      // 随机生成字体颜色
      ctx.fillStyle = this.randomColor(50, 160)
      // 随机生成字体大小
      ctx.font = this.randomNum(25, 35) + 'px SimHei'
      const x = 22
      const y = 35
      const deg = this.randomNum(-10, 8)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(txt, 0, 0)
      // //恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
      /* } */
      /* /**绘制干扰线**/
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = this.randomColor(40, 180)
        ctx.beginPath()
        ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height))
        ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height))
        ctx.stroke()
      }
      /** 绘制干扰点**/
      for (let k = 0; k < 20; k++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.codeImg {
  border-radius: 30px;
}
</style>
