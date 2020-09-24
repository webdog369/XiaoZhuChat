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
import { mapGetters } from 'vuex'
import { chat } from '../api/SocketApi'
import { formatTime } from '../tools/tools'
import { userSearchOne } from '../api/index'
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
      phone: false,
      chatList: [],
      friendData: {}
    }
  },
  watch: {
    // 当vuex中的ChatList发生变化时 若旧的值是空 则重新处理
    ChatList (n, o) {
      if (!o.length) {
        this.formatChatList()
      }
    }
  },
  methods: {
    // 发送信息
    enterMsg (e) {
      // 获取当前时间
      const CurrentTime = formatTime(new Date())
      // 定义一个信息体
      const obj = {
        myId: this.currentUser.userXZLCId,
        msg: this.value,
        time: CurrentTime
      }
      // 调用chat方法将信息发送给socket服务器
      chat(this.$route.params.userId, obj)
      // 获取到当前好友的id
      const userId = parseInt(this.$route.params.userId)
      // 判断vuex中用户聊天记录是否存在
      if (this.ChatList.length) {
        // 若存在 则遍历找出当前好友的聊天记录
        for (const key of this.ChatList) {
          if (key.friendId === userId) {
            // 找到后将当前信息添加到聊天记录列表中
            key.chats.push({
              userAvatar: this.currentUser.userAvatar,
              friendMsg: this.value,
              time: CurrentTime,
              tag: 'MY_MSG'
            })
          } else {
            // 若没有找到 则创建一个与该好友的聊天记录对象 并将该条信息添加到聊天记录中
            this.ChatList.push({
              friendId: userId,
              chats: [{
                userAvatar: this.currentUser.userAvatar,
                friendMsg: this.value,
                time: CurrentTime,
                tag: 'MY_MSG'
              }]
            })
          }
        }
        // 若该用户没有与如何好友的聊天记录 则在vuex中给当前好友添加一个聊天记录对象
      } else {
        this.ChatList.push({
          friendId: userId,
          chats: [{
            userAvatar: this.currentUser.userAvatar,
            friendMsg: this.value,
            time: CurrentTime,
            tag: 'MY_MSG'
          }]
        })
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
          if (value.friendId === this.friendData.userXZLCId) {
            value.userAvatar = this.friendData.userAvatar
            value.tag = 'FRIEND_MSG'
          } else {
            value.userAvatar = this.currentUser.userAvatar
            value.tag = 'MY_MSG'
          }
        })
      })
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
