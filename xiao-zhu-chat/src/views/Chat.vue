<template>
    <div class="chat-page">
        <InformationBar
          :listData="ChatLists"
          @changeTips="changeTips"
        ></InformationBar>
      <router-view></router-view>
    </div>
</template>

<script>
import InformationBar from '../components/InformationBar'
import { mapGetters, mapActions } from 'vuex'
import { userFriendList, userSearchOne } from '../api/index'
import { iKnow, MsgResult, UserConnection } from '../api/SocketApi'
export default {
  name: 'Chat',
  created () {
    const user = localStorage.getItem('user')
    const flag = this.currentUser.userName === '暂无数据'
    if (user && flag) {
      this.setCurrentUser(JSON.parse(user))
      UserConnection(JSON.parse(user))
      iKnow()
      MsgResult()
    }
    this.$nextTick(() => {
      this.formatData()
    })
  },
  components: {
    InformationBar
  },
  computed: {
    ...mapGetters([
      'ChatList',
      'currentUser'
    ])
  },
  data () {
    return {
      ChatLists: []
    }
  },
  watch: {
    ChatList (n) {
      console.log(n, '===')
      this.$nextTick(() => {
        this.formatData()
      })
    }
  },
  methods: {
    ...mapActions([
      'setCurrentUser'
    ]),
    changeTips (i) {
      this.ChatLists[i].tips = 0
    },
    formatData () {
      // 遍历当前用户的聊天记录列表
      for (const key of this.ChatList) {
        // 找到与每个好友最新的一条聊天记录
        const lastIndex = key.chats.length - 1
        const lastItem = key.chats[lastIndex]
        let remakeName = ''
        // 找到用户给该好友的备注名
        userFriendList(this.currentUser.userXZLCId).then(data => {
          for (const key1 of data.result) {
            if (key1.userId === key.friendId) {
              remakeName = key1.userRemakeName
            }
          }
          // 找到改好友的详细信息
          userSearchOne({
            friendId: key.friendId
          }).then(data => {
            // console.log(data)
            // 将用户每个好友的最新一条聊天数据提取出来 包装后push到数组中
            this.ChatLists.push({
              userXZLCId: data.data[0].userXZLCId,
              userName: data.data[0].userName,
              remakeName: remakeName,
              userAvatar: data.data[0].userAvatar,
              newMsg: lastItem.friendMsg,
              time: lastItem.time.substr(11, 5)
            })
          })
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.chat-page{
  position: fixed;
  left: 0;
  right: 0;
  top: 80px;
  bottom: 110px;
  overflow: hidden;
}
</style>
