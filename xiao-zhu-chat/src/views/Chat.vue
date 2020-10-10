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
import { formatTime } from '../tools/tools'
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
              remakeName = key1.remakeName
            }
          }
          // 找到改好友的详细信息
          userSearchOne({
            friendId: key.friendId
          }).then(data => {
            const time = this.formatTips(lastItem.time)
            // console.log(data)
            // 将用户每个好友的最新一条聊天数据提取出来 包装后push到数组中
            this.ChatLists.push({
              userXZLCId: data.data[0].userXZLCId,
              userName: data.data[0].userName,
              remakeName: remakeName,
              userAvatar: data.data[0].userAvatar,
              newMsg: lastItem.friendMsg,
              time: time
            })
          })
        })
      }
    },
    // 格式化时间格式
    formatTips (value) {
      // 格式化tips的显示方式
      const today = formatTime(new Date()).substr(0, 10)
      const tipsDay = (value + '').substr(0, 10)
      const oldTip = new Date(value).getTime() / 1000
      // const yesterday = new Date(value.tips).getTime() / 1000
      const flag = isNaN(oldTip)
      const isToday = (today === tipsDay)
      const howDay = parseInt(today.substr(8, 2)) - parseInt(tipsDay.substr(8, 2))
      const howTime = parseInt(value.substr(11, 2))
      // 如果是今天内的消息 则只显示时间段+小时分钟
      if (isToday && howTime >= 0 && howTime <= 8) {
        value = '凌晨 ' + value.substr(11, 5)
      } else if (isToday && howTime > 8 && howTime < 13) {
        value = '上午 ' + value.substr(11, 5)
      } else if (isToday && howTime >= 13 && howTime < 20) {
        value = '下午 ' + value.substr(11, 5)
      } else if (isToday && howTime >= 20) {
        value = '晚上 ' + value.substr(11, 5)
      }
      // 如果是今天以前的消息 则只显示时间段+小时分钟
      if (!flag && !isToday && howDay === 1) {
        value = '昨天' + value.substr(11, 5)
      } else if (!flag && !isToday && howDay === 2) {
        value = '前天' + value.substr(11, 5)
      } else if (!flag && !isToday && howDay > 2) {
        value = value.substr(0, 10)
      }
      return value
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
