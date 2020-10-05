<template>
<div class="tabbar">
  <router-link tag="div" class="item" to="/Chat">
    <b v-if="this.newMsgNum">{{this.newMsgNum}}</b>
    <i></i>
    <span>聊天</span>
  </router-link>
  <router-link tag="div" class="item" to="/ContactPerson">
    <b class="no-text" v-show="this.newFriendTips"></b>
    <i></i>
    <span>联系人</span>
  </router-link>
  <router-link tag="div" class="item" to="/Moments">
    <b class="no-text"></b>
    <i></i>
    <span>圈子</span>
  </router-link>
  <router-link tag="div" class="item" to="/Mine">
    <i></i>
    <span>我的</span>
  </router-link>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { userFriendList } from '../api'
export default {
  name: 'TabBar',
  computed: {
    ...mapGetters([
      'newMsgNum',
      'currentUser',
      'newFriendTips'
    ])
  },
  created () {
    userFriendList(this.currentUser.userXZLCId).then(data => {
      for (const value of data.result) {
        if (value.status === 0) {
          console.log('我运行了吗?')
          this.setNewFriendTips(true)
        }
      }
    })
  },
  data () {
    return {
      flag: false
    }
  },
  methods: {
    ...mapActions([
      'setNewFriendTips'
    ])
  }
}
</script>

<style scoped lang="scss">
.tabbar{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 110px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
  /*background: yellowgreen;*/
  background: #eee;
  display: flex;
  justify-content: space-around;
  z-index: 1001;
  .item{
    position: relative;
    b{
      display: inline-block;
      position: absolute;
      top: 0;
      right: -15px;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border-radius: 50%;
      background:  rgb(229,87,76);
      font-style: normal;
      font-size: 20px;
      color: #fff;
      &.no-text{
        width: 15px;
        height: 15px;
      }
    }
    i{
      display:block;
      width: 50px;
      height: 50px;
      margin: 10px auto;
      background-size: cover;
      background-repeat: no-repeat;
    }
    span{
      text-align: center;
      font-size: 25px;
      color: #333;
    }
    &:nth-child(1){
      i{
        background-image:url("../assets/images/Chat.png");
      }
    }
    &:nth-child(2){
      i{
        background-image:url("../assets/images/ContactPerson.png");
      }
    }
    &:nth-child(3){
      i{
        background-image:url("../assets/images/Moments.png");
      }
    }
    &:nth-child(4){
      i{
        background-image:url("../assets/images/Mine.png");
      }
    }

    &.router-link-active{
      &:nth-child(1){
        i{
          background-image:url("../assets/images/Chat_active.png");
        }
      }
      &:nth-child(2){
        i{
          background-image:url("../assets/images/ContactPerson_active.png");
        }
      }
      &:nth-child(3){
        i{
          background-image:url("../assets/images/Moments_active.png");
        }
      }
      &:nth-child(4){
        i{
          background-image:url("../assets/images/Mine_active.png");
        }
      }
      span{
        color: #1082FF;
      }
    }
  }
}
</style>
