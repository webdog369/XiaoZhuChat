<template>
    <div class="sign">
      <div class="logo">
        <i></i>
        <div class="appName">
        <h1>小朱轻聊</h1>
          <h2>Xiao Zhu Light chat</h2>
        </div>
      </div>
      <div class="signData">
        <div class="avatar">
          <div
            :class="['sex','boy',girl?'girl':'']"
            @click="changeSex"
          ></div>
        </div>
        <div class="userData">
          <div class="userName">
            <i></i>
            <input type="text" ref="userName">
          </div>
          <div class="password">
            <i></i>
            <input :type="psdShow?'text':'password'" ref="password">
            <span
              @click="showPsw"
              :class="{'hidden':psdShow}"
            ></span>
          </div>
        </div>
        <div class="verification_code">
          <div :class="['slide_bar',VcSuccess?'successMask':'']" ref="slideBar">
            向右滑动验证
            <div class="slideBg" ref="slideBg"></div>
            <div class="slide_btn"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend"
            ></div>
          </div>
        </div>
        <button class="signInBtn" @click="userSign('登录')">登录</button>
        <button class="signUpBtn" @click="userSign('注册')">注册</button>
      </div>
    </div>
</template>

<script>
import { signUp, signIn } from '../api/index'
import { mapActions } from 'vuex'
export default {
  name: 'Sign',
  mounted () {
    this.slideBarWidth = this.$refs.slideBar.clientWidth
  },
  data () {
    return {
      girl: false,
      psdShow: false,
      currentX: 0,
      touchStartX: 0,
      slideBarWidth: 0,
      startTime: 0,
      endTime: 0,
      VcSuccess: false,
      tips: [],
      canSubmit: false
    }
  },
  methods: {
    ...mapActions([
      'setTips',
      'setCurrentUser'
    ]),
    changeSex () {
      this.girl = !this.girl
    },
    showPsw () {
      this.psdShow = !this.psdShow
    },
    touchstart (el) {
      // 计算出鼠标按下的位置
      this.touchStartX = el.targetTouches[0].screenX
      this.startTime = el.timeStamp
    },
    touchmove (el) {
      // 两倍速滑动 提升流畅度
      const currentX = (el.targetTouches[0].screenX - this.touchStartX) * 2
      const value = this.slideBarWidth - el.target.clientWidth
      el.target.style.left = currentX + 'px'
      this.$refs.slideBg.style.width = currentX + el.target.clientWidth + 'px'
      if (currentX < 0) {
        el.target.style.left = 0
      } else if (currentX > value) {
        el.target.style.left = value + 'px'
      }
      this.currentX = currentX
    },
    touchend (el) {
      this.endTime = el.timeStamp
      // 如果没滑到 就归零
      if (this.currentX < this.slideBarWidth - el.target.clientWidth) {
        // 归零前加入缓动动画
        el.target.style.left = 0
        el.target.style.transition = 'left .3s ease-in-out'
        this.$refs.slideBg.style.width = 0
        this.$refs.slideBg.style.transition = 'width .3s ease-in-out'
        // 归零后删除缓动动画
        setTimeout(() => {
          el.target.style.transition = ''
          this.$refs.slideBg.style.transition = ''
        }, 300)
      } else {
        // 滑到最大高度后获取到滑动所用时长
        const time = parseInt(this.endTime - this.startTime) / 1000
        // 提示用户相关信息
        this.$refs.slideBg.style.width = this.slideBarWidth + 'px'
        this.$refs.slideBg.innerHTML = `完美~只用了${time}s`
        // 添加防止用户再次操作的透明遮罩
        this.VcSuccess = true
      }
    },
    userSign (type) {
      const userName = this.$refs.userName.value
      const password = this.$refs.password.value
      const userSex = this.girl ? 'girl' : 'boy'
      const obj = {
        userName: userName,
        password: password,
        userSex: userSex
      }
      if (userName === '') {
        this.setTips('用户名不能为空!')
      } else if (userName !== '' && password === '') {
        this.setTips('请输入密码!')
      } else if (password.length < 6) {
        this.setTips('密码不能小于6位,请重新输入!')
      } else if (!this.VcSuccess) {
        this.setTips('请完成滑动验证!')
      } else {
        this.canSubmit = true
      }
      const flag = this.canSubmit && this.VcSuccess
      if (flag && type === '注册') {
        signUp(obj).then(data => {
          this.setTips(data.data.msg)
          this.$refs.userName.value = ''
          this.$refs.password.value = ''
        })
      } else if (flag && type === '登录') {
        signIn(obj).then(data => {
          this.setTips(data.data.msg)
          if (data.data.msg === '登录成功') {
            this.setCurrentUser({
              userName: data.data.user.userName,
              userSex: data.data.user.userSex,
              userAvatar: data.data.user.userAvatar,
              userXZLCId: data.data.user.userXZLCId
            })
            this.$router.push('/Chat')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .sign{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*background: #eee;*/
    z-index: 9999;
    background-color: #1082FF;
    background-image: url('../assets/images/sign_bg.png');
    background-size:100%;
    /*background-size:65%;*/
    background-repeat: no-repeat;
    background-position: 0 -50px;
    overflow: auto;
    .logo{
      position: absolute;
      top: 130px;
      width: 100%;
      height: 100px;
      /*background: #fff;*/
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0 20px 0;
      i{
        display: inline-block;
        width: 105px;
        height: 105px;
        background-image: url('../assets/images/logo.png');
        background-size: cover;
        background-repeat: no-repeat;
      }
      .appName{
        margin-left: 20px;
        h1{
          flex: .5;
          font-size: 60px;
          text-align: center;
        }
        h2{
          font-size: 25px;
          text-align: center;
          color: #333;
        }
      }
    }
    .signData{
      position: absolute;
      left: 50%;
      top: 450px;
      transform: translateX(-50%);
      width: 80%;
      height: 750px;
      background:#fff;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      padding-top: 60px;
      .avatar{
        position: absolute;
        top: -50px;
        width: 100%;
        height: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        .sex{
          width: 100px;
          height: 100px;
          margin: 5px;
          background-size: cover;
          border-radius: 50%;
          border: 20px solid #1082FF;
          background-color: #fff;
          &.boy{
            background-image: url('../assets/images/avatar_boy.png');
          }
          &.girl{
            background-image: url('../assets/images/avatar_girl.png');
          }
        }
      }
      .userData{
        width: 80%;
        /*background: orange;*/
        .userName,.password{
          position: relative;
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          i{
            width: 50px;
            height: 50px;
            background-size: cover;
          }
          input{
            flex: 1;
            height: 80px;
            line-height: 80px;
            border:none;
            border-bottom: 1px solid #ccc;
            outline: none;
            padding: 0 50px 0 20px;
            font-size: 32px;
            color: #333;
            background: transparent;
          }
          span{
            position: absolute;
            top: 50%;
            right: 0;
            width: 50px;
            height: 50px;
            transform: translateY(-50%);
            background-image: url('../assets/images/password_hidden.png');
            background-size: cover;
            &.hidden{
              background-image: url('../assets/images/password_show.png');
            }
          }
        }
        .userName{
          i{
            background-image: url('../assets/images/user.png');
          }
        }
        .password{
          i{
            background-image: url('../assets/images/password.png');
          }
        }
      }
      .verification_code{
        width: 80%;
        height: 90px;
        border-radius: 50px;
        background: #eee;
        overflow: hidden;
        .slide_bar{
          position: relative;
          width: 100%;
          height: 100%;
          font-size: 28px;
          line-height: 90px;
          text-align: center;
          // 设定背景颜色
          background-image:linear-gradient(to right,#aaa 0, #ddd 120px, #aaa 100%);
          // 利用私有属性裁剪文字
          color: transparent;
          -webkit-background-clip: text;
          // 利用动画实现背景向右过渡
          animation:linearGradientColor .8s ease-in-out infinite;
          @keyframes linearGradientColor {
            from{
              background-position: 0 0;
            }
            to{
              background-position: 500px 0;
            }
          }
          .slideBg{
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            border-radius: 50px;
            background: #1082FF;
            color: #fff;
            font-size: 28px;
            text-align: center;
          }
          .slide_btn{
            position: absolute;
            left: 0;
            top: 0;
            width: 120px;
            height: 100%;
            background:radial-gradient(ellipse at 65% 25%, #fff,#bbb);
            border-radius: 50px;
            border:5px solid #ddd;
            box-sizing: border-box;
          }
          &.successMask{
            /*
            滑动验证码验证成功后加一个遮罩 防止再次点击
            */
            &::before{
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background: transparent;
              z-index: 999;
            }
          }
        }
      }
      .signInBtn,.signUpBtn{
        width: 70%;
        height: 100px;
        background: #1082FF;
        border-radius: 10px;
        line-height: 100px;
        text-align: center;
        font-size: 32px;
        color: #fff;
      }
      .signUpBtn{
        border: 2px solid #ccc;
        background: #fff;
        color: #333;
        box-sizing: border-box;
      }
    }
  }
</style>
