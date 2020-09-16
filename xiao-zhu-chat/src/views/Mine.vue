<template>
    <div class="mine">
      <div class="top">
        <div class="navbar">
          <h2>我的</h2>
          <span @click="goDetail">设置</span>
        </div>
        <div class="info">
          <div class="avatar">
            <img :src="baseUrl" alt="">
            <span></span>
            <i  ref="userState"></i>
              <input type="file"  name="newAvatar"  @change.prevent="setAvatar">
          </div>
          <div class="userMsg">
            <h2 class="title">{{currentUser.userName}}</h2>
            <div class="more">轻聊号:{{currentUser.userXZLCId}}</div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { userAvatarUpData } from '../api'
// import $ from 'jquery'

// import Vue from 'vue'

export default {
  name: 'Mine',
  mounted () {
    // 进入mine页面时需要重新从vuex中读取用户头像地址
    this.baseUrl = this.currentUser.userAvatar
    // 重新进入页面时watch中对userState的监测无法触发,需要重新读取用户当前状态
    const currentState = this.currentUser.userState
    this.monitoringStatus(currentState)
  },
  data () {
    return {
      baseUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  watch: {
    // 监听currentUser中的userState发生变化时 及时更新状态图标
    currentUser (newData) {
      const currentState = newData.userState
      this.monitoringStatus(currentState)
    }
  },
  methods: {
    ...mapActions([
      'setTips',
      'setCurrentUser'
    ]),
    // 更换用户头像
    setAvatar (e) {
      const file = e.target.files[0]
      this.baseUrl = window.URL.createObjectURL(file)
      window.URL.revokeObjectURL(file)
      // const fm = new FormData()
      // fm.append('newAvatar', file)
      // fm.append('name', 'avatar')
      // userAvatarUpData(fm).then(data => {
      //   console.log(data)
      // })
      const fm = new FormData()
      fm.append('newAvatar', file)
      fm.append('name', 'avatar')
      userAvatarUpData(fm, this.currentUser.userXZLCId).then(data => {
        console.log(data)
        this.setTips(data.data.msg)
      })
      // 修改头像后及时修改vuex中的用户数据
      this.setCurrentUser({
        userName: this.currentUser.userName,
        userAvatar: this.baseUrl,
        userSex: this.currentUser.userSex,
        userXZLCId: this.currentUser.userXZLCId,
        userState: this.currentUser.userState
      })
      // const fm = new FormData()
      // fm.append('newAvatar', file)
      // $.ajax({
      //   url: 'http://127.0.0.1:3000/avatar',
      //   type: 'PATCH',
      //   contentType: false,
      //   data: fm,
      //   cache: false,
      //   processData: false,
      //   success: (data) => {
      //     console.log(data)
      //   }
      // })
      // const fr = new FileReader()
      // fr.readAsArrayBuffer(file)
      // fr.onload = () => {
      //   const data = fr.result
      //   const lenght = fr.result.byteLength
      //   console.log(lenght)
      //   userAvatarUpData({
      //     newAvatar: data
      //   }).then(data => {
      //     console.log(data)
      //   })
      // }
      // const url = new URL(this.baseUrl).href
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = () => {
      //   console.log(fr.result)
      //   this.baseUrl = fr.result
      // }
      // userUpData(this.currentUser.userXZLCId, {
      //   key: 'userAvatar',
      //   value: this.baseUrl,
      //   type: type.replace('image/', '')
      // })
      // userAvatarUpData(window.URL.createObjectURL(file)).then(data => {
      //   console.log(data)
      // })
      // console.log(fm)
      // Vue.self.instance.post('/avatar', fm).then(data => {
      //   console.log(data)
      // }).catch(err => {
      //   console.log(err)
      // })
      // userAvatarUpData({
      //   newAvatar: data
      // }).then(data => {
      //   console.log(data)
      // })
    },
    // 跳转到详情页
    goDetail () {
      this.$router.push({
        path: '/Mine/detail'
      })
    },
    // 判断当前账号状态的方法
    monitoringStatus (currentState) {
      this.$refs.userState.className = ''
      switch (currentState) {
        case '在线':
          this.$refs.userState.classList.add('online')
          break
        case '忙碌':
          this.$refs.userState.classList.add('busy')
          break
        case '请勿打扰':
          this.$refs.userState.classList.add('doNotDisturb')
          break
        case '隐身':
          this.$refs.userState.classList.add('stealth')
          break
      }
    }
  }
}
</script>
<style scoped lang="scss">
.mine{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 110px;
  background:rgb(224,224,224);
  /*background-image: url('../assets/images/Mine_bg.jpg');*/
  /*background-size: cover;*/
  z-index: 1000;
  overflow: hidden;
  .top{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
    background: #1082FF;
    .navbar{
      width: 95%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      h2,span{
        width: 90px;
        height: 100%;
        font-size: 32px;
        color: #fff;
        line-height: 60px;
      }
    }
    .info{
      width:100%;
      height: 380px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .avatar{
        position: relative;
        width: 150px;
        height: 150px;
        /*background-color: #fff;*/
        img{
          width: 100%;
          height: 100%;
          background-image: url('../assets/images/user.png');
          background-size: 80%;
          background-repeat: no-repeat;
          background-position:center;
          border-radius: 10px;
        }
        i{
          position: absolute;
          right: -10px;
          top: -10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-size: 120%;
          background-color: #fff;
          background-image: url('../assets/images/userState_online.png');
          background-position: center;
          &.online{
            background-image: url('../assets/images/userState_online.png');
          }
          &.busy{
            background-image: url('../assets/images/userState_busy.png');
          }
          &.doNotDisturb{
            background-image: url('../assets/images/userState_doNotDisturb.png');
          }
          &.stealth{
            background-image: url('../assets/images/userState_stealth.png');
          }
        }
        input,span{
          display: inline-block;
          position: absolute;
          right: -40px;
          bottom: 0;
          width: 30px;
          height: 30px;
        }
        input{
          opacity: 0;
        }
        span{
          background-image: url('../assets/images/set.png');
          background-size: cover;
        }
      }
      .userMsg{
        width: 220px;
        .title{
          width: 100%;
          height: 50px;
          text-align: center;
          font-size: 45px;
          color: #fff;
          margin-top:15px;
          margin-bottom: 15px;
        }
        .more{
            width: 100%;
            height:50px;
            font-size: 28px;
            text-align: center;
            color: #fff;
          }
      }
    }

  }
  .content{
    width: 100%;
    height: 600px;
    img{
      width: 300px;
      height: 300px;
    }
  }
}
</style>
