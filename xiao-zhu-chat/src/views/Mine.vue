<template>
    <div class="mine">
      <div class="top">
        <div class="navbar">
          <h2>我的</h2>
          <span>设置</span>
        </div>
        <div class="info">
          <div class="avatar">
            <img :src="currentUser.userAvatar" alt="">
          </div>
          <div class="userMsg">
            <h2 class="title">{{currentUser.userName}}</h2>
            <div class="more">
              <p class="userId">轻聊号:{{currentUser.userXZLCId}}</p>
              <span class="moreMsg"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <input type="file" ref="file" @change="getFile">
        <button @click="getFile">获取数据</button>
        <img :src="baseUrl" alt="">
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Mine',
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
    getFile (e) {
      const file = e.target.files[0]
      this.baseUrl = window.URL.createObjectURL(file)
      // const fs = new FileReader()
      // fs.readAsDataURL(file)
      // fs.onload = (e) => {
      //   this.baseUrl = e.target.result
      // }
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
  /*background:#fff;*/
  background-image: url('../assets/images/Mine_bg.jpg');
  background-size: cover;
  z-index: 1000;
  overflow: hidden;
  &::after{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.2);
    z-index: -1;
  }
  .top{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
    /*background: #1082FF;*/
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
      width: 95%;
      height: 180px;
      display: flex;
      justify-content: space-between;
      .avatar{
        width: 150px;
        height: 150px;
        /*background-color: #fff;*/
        background-image:url("../assets/images/avatar_boy.png");
        background-size: cover;
        border-radius: 10px;
        margin: 0 40px 0 10px;
      }
      .userMsg{
        height: 150px;
        flex: 1;
        /*background:orange;*/
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title{
          width: 100%;
          height: 100px;
          font-size: 45px;
          color: #fff;
        }
        .more{
          width: 100%;
          height:50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p{
            display: inline-block;
            font-size: 28px;
            color: #eee;
          }
          span{
            width: 35px;
            height: 35px;
            background-image: url('../assets/images/more_light_btn.png');
            background-size: cover;
            margin-right:10px;
          }
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
