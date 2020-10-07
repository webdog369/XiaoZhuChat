<template>
 <div class="friend-detail">
   <ReturnNavBar :title="userData.userName"></ReturnNavBar>
   <div class="content">
     <div class="avatar">
       <img :src="userData.userAvatar" alt="" @click.stop="showAvatar">
     </div>
     <div class="more-data">
       <h1 class="name">{{userData.userName}}<i :class="[userData.userSex==='男'?'boy':'girl']"></i></h1>
       <p>轻聊号：{{userData.userXZLCId}}</p>
     </div>
   </div>
   <div class="set-remake-name"
        v-if="isFriend"
   >设置备注<i></i></div>
   <div class="friend-moment">ta的圈子<i></i></div>
   <div class="go-chat"
        v-if="isFriend"
        @click.stop="goChat(userData.userXZLCId)"
   ><i></i>发消息</div>
   <div class="go-add" v-else><i></i>加为好友</div>
 </div>
</template>

<script>
import ReturnNavBar from './ReturnNavBar'
import { userSearchOne } from '../api'

export default {
  name: 'UserDetail',
  components: {
    ReturnNavBar
  },
  created () {
    userSearchOne({
      friendId: this.$route.params.userId
    }).then(data => {
      this.userData = data.data[0]
    })
  },
  data () {
    return {
      isFriend: true,
      userData: {}
    }
  },
  methods: {
    showAvatar (e) {
      this.$router.push({ path: `/showAvatar/${this.userData.userXZLCId}`, query: { src: e.target.src } })
    },
    goChat (id) {
      this.$router.push({ path: `/user/${id}`, query: { userName: this.userData.userName } })
    }
  }
}
</script>

<style scoped lang="scss">
.friend-detail{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 9999;
  .content{
    width: 100%;
    height: 200px;
    /*background: yellowgreen;*/
    display: flex;
    justify-content: space-between;
    border-bottom: 15px solid #eee;
    .avatar{
      position: relative;
      width: 170px;
      height: 179px;
      /*background: #000;*/
      img{
        position: absolute;
        left: 50%;
        top: 15%;
        bottom: 0;
        transform: translateX(-50%);
        height: 70%;
        border-radius: 15px;
      }
    }
    .more-data{
      flex:1;
      height: 179px;
      margin-left: 15px;
      /*background: orange;*/
      h1{
        width: 100%;
        line-height: 50px;
        font-size: 38px;
        margin-top: 50px;
        i{
          display: inline-block;
          width: 25px;
          height: 25px;
          background-size: cover;
          background-position:center;
          background-repeat: no-repeat;
          margin-left: 15px;
          &.boy{
            background-image: url('../assets/images/boy_icon.png');
          }
          &.girl{
            background-image: url('../assets/images/girl_icon.png');
          }
        }
      }
      p{
        font-size: 26px;
        line-height: 50px;
        color: #666;
      }
    }
  }
  .set-remake-name,.friend-moment{
    position: relative;
    width: 100%;
    height: 100px;
    line-height: 100px;
    padding-left: 15px;
    border-bottom: 1px solid #ddd;
    font-size: 28px;
    letter-spacing: 1px;
    i{
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      width: 35px;
      height: 35px;
      background-image: url('../assets/images/more_dark.png');
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .go-chat,.go-add{
    position: relative;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: #fff;
    color: #515151;
    border-top: 15px solid #eee;
    border-bottom: 1px solid #ddd;
  }
  .go-chat{
    i{
      display: inline-block;
      width: 40px;
      height: 40px;
      background-image: url('../assets/images/go_chat.png');
      background-size: cover;
      background-repeat: no-repeat;
      vertical-align: middle;
      margin-right: 15px;
    }
  }
  .go-add{
    i{
      display: inline-block;
      width: 40px;
      height: 40px;
      background-image: url('../assets/images/go_add.png');
      background-size: cover;
      background-repeat: no-repeat;
      margin-right: 15px;
      vertical-align: middle;
    }
  }
}
</style>
