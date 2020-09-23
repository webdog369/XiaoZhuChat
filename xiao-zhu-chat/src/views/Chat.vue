<template>
    <div class="chat-page">
        <InformationBar :listData="ChatLists"></InformationBar>
      <router-view></router-view>
    </div>
</template>

<script>
import InformationBar from '../components/InformationBar'
import { mapGetters } from 'vuex'
// import { userSearchOne } from '../api/index'
export default {
  name: 'Chat',
  mounted () {
    // this.$nextTick(() => {
    //   const arr = this.ChatList
    //   if (this.ChatList.length) {
    //     const obj = {}
    //     const FriendIds = [1000, 1002]
    //     for (let i = 0; i < FriendIds.length; i++) {
    //       obj[i] = []
    //       for (const key2 of arr) {
    //         if (key2.friendId === FriendIds[i]) {
    //           obj[i].push(key2)
    //         }
    //       }
    //     }
    //     const newData = []
    //     for (const key in obj) {
    //       newData.unshift(obj[key][0])
    //     }
    //     for (const key of newData) {
    //       userSearchOne({
    //         friendId: key.friendId
    //       }).then(data => {
    //         const userData = data.data[0]
    //         const obj2 = {
    //           userName: userData.userName,
    //           userAvatar: userData.userAvatar,
    //           newMsg: key.friendMsg,
    //           time: key.time.substr(11, 5)
    //         }
    //         this.ChatLists.push(obj2)
    //       })
    //     }
    //   }
    // })
  },
  components: {
    InformationBar
  },
  computed: {
    ...mapGetters([
      'ChatList'
    ])
  },
  data () {
    return {
      ChatLists: []
    }
  },
  watch: {
    ChatList (n) {
      // const newData = n[0]
      // userSearchOne({
      //   friendId: newData.friendId
      // }).then(data => {
      //   const userData = data.data[0]
      //   const obj = {
      //     userName: userData.userName,
      //     userAvatar: userData.userAvatar,
      //     newMsg: newData.friendMsg,
      //     time: newData.time.substr(11, 5)
      //   }
      //   this.ChatLists.map((value, index) => {
      //     if (obj.userName === value.userName) {
      //       this.ChatLists[index] = obj
      //     }
      //   })
      // })
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
