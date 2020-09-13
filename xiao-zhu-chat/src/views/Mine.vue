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
            <form enctype="multipart/form-data">
              <input type="file" @change="setAvatar" >
            </form>
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
import { mapGetters } from 'vuex'
import { userUpData, userAvatarUpData } from '../api'

export default {
  name: 'Mine',
  mounted () {
    this.baseUrl = this.currentUser.userAvatar
  },
  components: {
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
  methods: {
    setAvatar (e) {
      const file = e.target.files[0]
      const type = e.target.files[0].type
      this.baseUrl = window.URL.createObjectURL(file)
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = () => {
      //   console.log(fr.result)
      //   this.baseUrl = fr.result
      // }
      userUpData(this.currentUser.userXZLCId, {
        key: 'userAvatar',
        value: this.baseUrl,
        type: type.replace('image/', '')
      })
      userAvatarUpData(window.URL.createObjectURL(file)).then(data => {
        console.log(data)
      })
    },
    goDetail () {
      this.$router.push({
        path: '/Mine/detail'
      })
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
