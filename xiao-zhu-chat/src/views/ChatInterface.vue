<template>
      <div class="chat-interface" ref="chatInterfac">
        <ReturnNavBar :title="this.$route.query.userName"></ReturnNavBar>
          <ChatBubble
            :chatList="chatList"
          ></ChatBubble>
        <div class="input-box">
             <input type="text" v-model="value" @keydown.enter="enterMsg" >
          <div class="more"></div>
          <button v-show="value!==''" @click="enterMsg" class="send">发送</button>
        </div>
      </div>
</template>

<script>
import ReturnNavBar from '../components/ReturnNavBar'
import ChatBubble from '../components/ChatBubble'
import { mapGetters, mapActions } from 'vuex'
import { chat } from '../api/SocketApi'
import { formatTime } from '../tools/tools'
import { userSearchOne, userUpData } from '../api/index'
/* import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui' */
export default {
  name: 'ChatInterface',
  created () {
    // 初次进入联系人列表时 格式化数据库中的聊天数据
    this.$nextTick(() => {
      this.formatChatList()
    })
  },
  mounted () {
    console.log('父组件完成了')
  },
  updated () {
    console.log('父组件更新了')
  },
  beforeDestroy () {
    // 在用户离开聊天窗口时记录离开时间
    userUpData(parseInt(this.currentUser.userXZLCId), {
      key: 'disconnectedTime',
      value: new Date().getTime()
    })
    // 将vuex中当前正在聊天用户的id清空
    this.setCurrentChattingId(null)
  },
  components: {
    ReturnNavBar,
    ChatBubble
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'ChatList'
    ])
  },
  data () {
    return {
      value: '',
      chatList: [],
      friendData: {}
    }
  },
  watch: {
    // 当vuex中的ChatList发生变化时 若旧的值是空 则重新处理
    ChatList (n, o) {
      // this.formatChatList()
      if (!o.length) {
        this.formatChatList()
      }
    }
  },
  methods: {
    ...mapActions([
      'setCurrentChattingId'
    ]),
    // 发送信息
    enterMsg (e) {
      // 获取当前时间
      const CurrentTime = formatTime(new Date())
      let oldTime = null
      if (this.chatList.length) {
        oldTime = new Date(this.chatList[this.chatList.length - 1].time).getTime() / 1000
      }
      const value = (new Date().getTime() / 1000) - oldTime
      // 定义一个信息体
      const obj = {
        myId: this.currentUser.userXZLCId,
        msg: this.value,
        time: CurrentTime
      }
      // 当最新信息与当前信息时间差超过三分钟时 给该条信息一个时间提示标签
      if (value > 180) {
        obj.tips = CurrentTime
      }
      // 获取最新一条消息的时间 若超过三分钟 则显示时间提示
      // 调用chat方法将信息发送给socket服务器
      chat(this.$route.params.userId, obj)
      // 获取到当前好友的id
      const userId = parseInt(this.$route.params.userId)
      // 判断vuex中用户聊天记录是否存在
      if (this.ChatList.length) {
        let index = 0
        let flag = false
        this.ChatList.map((v, i) => {
          if (v.friendId === userId) {
            // 查找是否存在与当前好友的聊天记录 找到后将索引存储起来
            flag = true
            index = i
          }
        })
        if (flag) {
          const msgData = {
            userAvatar: this.currentUser.userAvatar,
            friendMsg: this.value,
            time: CurrentTime,
            tag: 'MY_MSG'
          }
          if (value > 180) {
            msgData.tips = CurrentTime
          }
          // 找到后将当前信息添加到聊天记录列表中
          this.formatTips(msgData)
          this.ChatList[index].chats.push(msgData)
        } else {
          // 若没有找到 则创建一个与该好友的聊天记录对象 并将该条信息添加到聊天记录中
          const msg = {
            friendId: userId,
            chats: [{
              userAvatar: this.currentUser.userAvatar,
              friendMsg: this.value,
              time: CurrentTime,
              tag: 'MY_MSG',
              tips: CurrentTime
            }]
          }
          this.formatTips(msg.chats[0])
          this.ChatList.push(msg)
        }
        // 若该用户没有与如何好友的聊天记录 则在vuex中给当前好友添加一个聊天记录对象
      } else {
        const msg = {
          friendId: userId,
          chats: [{
            userAvatar: this.currentUser.userAvatar,
            friendMsg: this.value,
            time: CurrentTime,
            tag: 'MY_MSG',
            Tips: CurrentTime
          }]
        }
        this.formatTips(msg.chats[0])
        this.ChatList.push()
      }
      // 输入完信息后清空表单
      this.value = ''
    },
    // 将聊天信息处理成聊天气泡能识别的格式
    formatChatList () {
      const userId = parseInt(this.$route.params.userId)
      for (const key of this.ChatList) {
        if (key.friendId === userId) {
          this.chatList = key.chats
        }
      }
      userSearchOne({
        friendId: parseInt(this.$route.params.userId)
      }).then(data => {
        this.friendData = data.data[0]
        this.chatList.map((value, index) => {
          // 判断是自己的信息还是好友的信息,并打上tag
          if (value.friendId === this.friendData.userXZLCId) {
            value.userAvatar = this.friendData.userAvatar
            value.tag = 'FRIEND_MSG'
          } else {
            value.userAvatar = this.currentUser.userAvatar
            value.tag = 'MY_MSG'
          }
          this.formatTips(value)
        })
      })
    },
    // 格式化提示信息
    formatTips (value) {
      if (value.tips === undefined) return
      // 格式化tips的显示方式
      const today = formatTime(new Date()).substr(0, 10)
      const tipsDay = (value.tips + '').substr(0, 10)
      const oldTip = new Date(value.tips).getTime() / 1000
      // const yesterday = new Date(value.tips).getTime() / 1000
      const flag = isNaN(oldTip)
      const isToday = today === tipsDay
      const howDay = parseInt(today.substr(9, 2)) - parseInt(tipsDay.substr(9, 2))
      const howTime = parseInt(value.tips.substr(11, 2))
      // 如果是今天内的消息 则只显示时间段+小时分钟
      if (isToday && howTime >= 0 && howTime <= 8) {
        value.tips = '凌晨' + value.tips.substr(11, 5)
      } else if (isToday && howTime > 8 && howTime < 13) {
        value.tips = '上午' + value.tips.substr(11, 5)
      } else if (isToday && howTime >= 13 && howTime < 20) {
        value.tips = '下午' + value.tips.substr(11, 5)
      } else if (isToday && howTime >= 20) {
        value.tips = '晚上' + value.tips.substr(11, 5)
      }
      // 如果是今天以前的消息 则只显示时间段+小时分钟
      if (!flag && !isToday && howDay === 1) {
        value.tips = '昨天' + value.tips.substr(11, 5)
      } else if (!flag && !isToday && howDay === 2) {
        value.tips = '前天' + value.tips.substr(11, 5)
      } else if (!flag && !isToday && howDay > 2) {
        value.tips = value.tips.substr(0, 10)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .chat-interface{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    /*height: 100%;*/
    bottom: 0;
    background:rgb(230,230,230);
    z-index:  9999;
    .input-box{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100px;
      background: #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input{
        flex: 1;
        height: 75%;
        margin-left: 20px;
        margin-right: 20px;
        border:none;
        outline: none;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 10px;
        line-height: 80px;
        font-size: 28px;
        color: #333;
      }
      .more{
        width: 80px;
        height: 80px;
        margin-right: 10px;
        background-image: url('../assets/images/more.png');
        background-size: cover;
        background-repeat: no-repeat;
      }
      .send{
        width: 120px;
        height: 80px;
        margin-right: 10px;
        background: #1082FF;
        border-radius: 10px;
        border:none;
        color: #fff;
        font-size: 28px;
      }
    }
  }

</style>
