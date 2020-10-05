<template>
    <div class="add-friend">
      <ReturnNavBar :title="'添加好友'"></ReturnNavBar>
     <!--搜索栏-->
      <div class="search">
        <span></span>
        <input
          type="text"
          v-model="value"
          @focus="hidePla"
          :placeholder="placeholder"
        >
      </div>
      <!--搜索提示-->
      <div class="searchBtn" v-show="value" @click.stop="search">
        <i></i>
        <p>搜索: <span>{{value}}</span></p>
      </div>
      <!--搜索结果-->
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
              <span>
                <i
                  :class="[value.userSex === '男'?'boy':'girl']"
              ></i>{{value.userSex}}</span>
              <span>轻聊号:{{value.userXZLCId}}</span>
            </div>
          </div>
        </div>
        <span class="add" @click.stop="goAdd">添加</span>
      </div>
      <div class="errmsg" v-show="noUser">用户不存在</div>

      <!--添加历史-->
      <hr>
      <p style="color:#666;font-size: 28px;">{{this.searchHistory.length?'添加历史':'暂无添加记录'}}</p>
      <div
        class="searchHistory"
        v-for="(value, index) in searchHistory"
        :key="value.userName"
      >
        <div class="friend">
          <img class="avatar" :src="value.userAvatar">
          <div class="userData">
            <div class="userName">{{value.userName}}</div>
            <div class="other">
              <span>
                <i
                  :class="[value.userSex === '男'?'boy':'girl']"
                ></i>{{value.userSex}}</span>
              <span>轻聊号:{{value.userXZLCId}}</span>
            </div>
          </div>
        </div>
         <!--若是主动添加显示等待验证-->
          <span
            :class="['add',{'wait':value.status === 0},{'add-ok':value.status === 1},{'add-fail':value.status === 2}]"
            v-if="value.initiative"
          >{{statusText[value.status]}}</span>
          <div class="change" v-else-if="value.status === 0">
            <span @click.stop="agree(value.userXZLCId,index)">同意</span>
            <span @click.stop="refuse(value.userXZLCId,index)">拒绝</span>
          </div>
        <span
          :class="['add',{'add-ok':value.status === 1},{'add-fail':value.status === 2}]"
          v-else
        >{{statusText2[value.status]}}</span>
      </div>

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
import { userSearchOne, userAddFriend, userFriendList, agreeFriend } from '../api'
import { mapGetters, mapActions } from 'vuex'
import { appendFriend, chat } from '../api/SocketApi'
import { formatTime } from '../tools/tools'

export default {
  name: 'AddFriend',
  created () {
    this.$nextTick(() => {
      // 将用户好友列表导入
      userFriendList(this.currentUser.userXZLCId).then(data => {
        const type = typeof data.result
        if (type === 'object') {
          for (const value of data.result) {
            // console.log(value.userId)
            console.log(value)
            userSearchOne({ friendId: value.userId }).then(res => {
              res.data[0].status = value.status
              res.data[0].initiative = value.initiative
              this.searchHistory.unshift(res.data[0])
            })
          }
        }
      })
    })
  },
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
      searchHistory: [],
      srShow: false,
      noUser: false,
      remakeName: false,
      rnValue: '',
      statusText: ['等待验证', '对方已同意', '对方已拒绝'],
      statusText2: ['等待验证', '已同意', '已拒绝']
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
      // 若用户查找的是自己 就跳转到个人界面
      if (result === this.currentUser.userXZLCId || this.value === this.currentUser.userName) {
        this.$router.push({ path: '/Mine' })
        return
      }
      const data = {
        friendName: this.value,
        friendId: result
      }
      userSearchOne(data).then(data => {
        if (data.data[0].userName !== undefined) {
          this.searchResult = data.data
        } else {
          this.noUser = true
        }
      })
      this.value = ''
      this.srShow = true
    },
    goAdd () {
      // this.remakeName = true
      // 定义一个flag
      let flag = false
      let currentIndex = null
      let status = null
      // 查找用户添加记录中是否存在该用户
      this.searchHistory.map((value, index) => {
        if (value.userXZLCId === this.searchResult[0].userXZLCId) {
          flag = true
          currentIndex = index
          status = value.status
          console.log('你添加过当前用户了')
        }
      })
      // 若不存在 则添加一条添加记录
      if (!flag) {
        console.log('你没添加过当前用户,现在添加')
        console.log(this.searchResult[0])
        this.searchResult[0].status = 0
        this.searchResult[0].initiative = true
        this.searchHistory.unshift(this.searchResult[0])
        this.srShow = false
        appendFriend(this.searchResult[0].userXZLCId, `${this.currentUser.userName}请求添加你为好友`)
        userAddFriend(
          this.currentUser.userXZLCId,
          {
            friendId: this.searchResult[0].userXZLCId
          }
        ).then(data => {
          this.setSelectTips([data.data.msg, true])
          // this.$router.go(-1)
        })
        // 若存在 则分情况提示用户
      } else {
        console.log('监测到你添加过了,现在开始重新请求')
        this.srShow = false
        userAddFriend(
          this.currentUser.userXZLCId,
          {
            friendId: this.searchResult[0].userXZLCId
          }
        ).then(data => {
          console.log(this.searchHistory[currentIndex])
          if (status === 2) {
            this.searchHistory[currentIndex].status = 0
          }
          this.setSelectTips([data.data.msg, true])
          // this.$router.go(-1)
        })
      }
    },
    agree (id, i) {
      const CurrentTime = formatTime(new Date())
      agreeFriend(this.currentUser.userXZLCId, {
        friendId: id,
        result: true
      }).then(data => {
        this.searchHistory[i].status = 1
        chat(this.searchHistory[i].userXZLCId, {
          myId: this.currentUser.userXZLCId,
          msg: '我通过了你的好友验证,一起来聊天吧~',
          time: CurrentTime,
          tips: '已成功添加对方为好友'
        })
      })
    },
    refuse (id, i) {
      agreeFriend(this.currentUser.userXZLCId, {
        friendId: id,
        result: false
      }).then(data => {
        this.searchHistory[i].status = 2
      })
      // agreeFriend()
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
  .searchResult,.searchHistory{
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
            background-size: cover;
            margin-left: 5px;
            margin-right: 5px;
            vertical-align: middle;
            &.boy{
              background-image: url('../assets/images/boy_icon.png');
            }
            &.girl{
              background-image: url('../assets/images/girl_icon.png');
            }
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
      width: auto;
      height: 50px;
      line-height: 50px;
      background: #1082FF;
      color: #ffffff;
      text-align: center;
      margin-right: 25px;
      font-size: 25px;
      padding-left: 10px;
      padding-right: 10px;
      &.wait{
        background: orange;
      }
      &.add-ok{
        background: #ccc;
      }
      &.add-fail{
        background: indianred;
      }
    }
    .change{
      width: 200px;
      height: 100%;
      background: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span{
        width: 80px;
        height: 60px;
        background: forestgreen;
        color: #fff;
        line-height: 60px;
        font-size: 25px;
        text-align: center;
        border-radius: 5px;
        &:nth-child(2){
          background: indianred;
        }
      }
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
