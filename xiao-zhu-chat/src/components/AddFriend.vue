<template>
    <div class="add-friend">
      <ReturnNavBar :title="'添加好友'"></ReturnNavBar>
      <div class="search">
        <span></span>
        <input
          type="text"
          v-model="value"
          @focus="hidePla"
          :placeholder="placeholder"
        >
      </div>
      <div class="searchBtn" v-show="value" @click.stop="search">
        <i></i>
        <p>搜索: <span>{{value}}</span></p>
      </div>
      <div
        class="searchResult"
        v-for="value in searchResult"
        :key="value.userXZLCId"
        v-show="srShow"
      >
        <div class="friend">
          <img class="avatar" :src="value.userAvatar">
          <div class="userData">
            <div class="userName">{{value.userName}}</div>
            <div class="other">
              <span><i></i>{{value.userSex}}</span>
              <span>轻聊号:{{value.userXZLCId}}</span>
            </div>
          </div>
        </div>
        <span class="add" @click.stop="goAdd">添加</span>
      </div>
      <div class="errmsg" v-show="noUser">用户不存在</div>
      <div class="remakeName" v-show="remakeName">
        <input type="text" placeholder="给好友添加个好记的名字吧~" v-model="rnValue">
        <button
          :class="{'active':rnValue.length}"
          @click.stop="add"
        >{{rnValue.length?'完成':'暂不添加'}}</button>
      </div>
    </div>
</template>

<script>
import ReturnNavBar from './ReturnNavBar'
import { userSearchOne, userAddFriend } from '../api'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddFriend',
  components: {
    ReturnNavBar
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data () {
    return {
      value: '',
      placeholder: '输入好友用户名或轻聊号添加...',
      searchResult: [],
      srShow: false,
      noUser: false,
      remakeName: false,
      rnValue: ''
    }
  },
  methods: {
    ...mapActions([
      'setTips',
      'setSelectTips'
    ]),
    hidePla (e) {
      this.placeholder = ''
      if (this.value.length === 0) {
        this.noUser = false
        this.searchResult = []
      }
    },
    search () {
      const result = parseInt(this.value)
      const data = {
        friendName: this.value,
        friendId: result
      }
      userSearchOne(data).then(data => {
        if (data.data[0].userName !== undefined) {
          this.searchResult = data.data
          console.log(data)
        } else {
          this.noUser = true
        }
      })
      this.value = ''
      this.srShow = true
    },
    goAdd () {
      this.remakeName = true
      this.srShow = false
    },
    add () {
      userAddFriend(
        this.currentUser.userXZLCId,
        {
          friendId: this.searchResult[0].userXZLCId,
          remakeName: this.rnValue
        }
      ).then(data => {
        console.log(data)
        this.setSelectTips([data.data.msg, true])
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.add-friend{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  .search{
    width: 95%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    margin-top: 15px;
    border-radius: 40px;
    overflow: hidden;
    span{
      width: 50px;
      height: 50px;
      background-image: url('../assets/images/search_light.png');
      background-size: cover;
      margin-left: 15px;
      margin-right: 15px;
    }
    input{
      flex: 1;
      height: 100%;
      outline: none;
      border:none;
      caret-color: #1082FF;
      line-height: 80px;
      border-bottom: 1px solid #aaa;
      color: #333;
      font-size: 28px;
      margin-right: 20px;
      background: #fff;
      padding-left: 15px;
      padding-right: 15px;
    }
    input::-webkit-input-placeholder{
      color: #ccc;
    }
  }
  .searchBtn{
    width: 100%;
    height: 100px;
    /*background: #1082FF;*/
    background: #fff;
    font-size: 28px;
    border:none;
    margin: 10px auto;
    display: flex;
    justify-content: start;
    align-items: center;
    i{
      width: 80px;
      height: 80px;
      background-color: #1082FF;
      background-image: url('../assets/images/add_friend.png');
      background-size: 70%;
      background-position:center;
      background-repeat: no-repeat;
      margin-left: 10px;
      border-radius: 10px;
    }
    p{
      flex: 1;
      line-height: 100px;
      margin-left: 15px;
      font-size: 28px;
      span{
        color: #1082FF;
      }
    }
  }
  .searchResult{
    width: 100%;
    min-height: 100px;
    background: #fff;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    padding-bottom: 15px;
    .friend{
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar{
        width: 100px;
        height: 100px;
        background: url("../assets/images/avatar_boy.png");
        background-size: cover;
        margin: 15px;
      }
      .userData{
        width: 80%;
        height: 100%;
        /*background: yellowgreen;*/
        .userName{
          width: 100%;
          height: 80px;
          line-height: 80px;
          font-size: 32px;
          color: #333;
        }
        .other{
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: start;
          align-items: center;
          i{
            display: inline-block;
            width: 30px;
            height: 30px;
            background-image: url('../assets/images/boy_icon.png');
            background-size: cover;
            margin-left: 5px;
            margin-right: 5px;
            vertical-align: middle;
          }
          span{
            line-height: 60px;
            font-size: 28px;
            &:nth-child(2){
              margin-left: 15px;
              color: #1082FF;
            }
          }
        }
      }
    }
    .add{
      width: 120px;
      height: 50px;
      line-height: 50px;
      background: #1082FF;
      color: #ffffff;
      text-align: center;
      margin-right: 25px;
      font-size: 25px;
    }
  }
  .errmsg{
    width: 100%;
    height: 100px;
    margin-top: 5px;
    font-size: 28px;
    line-height: 100px;
    text-align: center;
    color: #333;
    background: #fff;
  }
  .remakeName{
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    height: 200px;
    background: #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    input{
      height: 80px;
      flex: 1;
      border:none;
      background: #eee;
      font-size: 30px;
      outline: none;
      border-bottom: 1px solid #ccc;
      padding-left: 15px;
      padding-right: 15px;
      margin-right: 5px;
    }
    button{
      height: 80px;
      width: 150px;
      color: #fff;
      font-size: 28px;
      border:none;
      margin-right: 20px;
      border-radius: 10px;
      background: #4886c7;
      &.active{
        background: #1082FF;
      }
    }
  }
}
</style>
