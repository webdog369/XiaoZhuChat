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
/* import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui' */
export default {
  name: 'ChatInterface',
  mounted () {
  },
  components: {
    ReturnNavBar,
    ChatBubble
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data () {
    return {
      value: '',
      phone: false,
      chatList: []
    }
  },
  methods: {
    enterMsg (e) {
      const CurrentTime = formatTime(new Date())
      console.log(CurrentTime)
      const obj = {
        myId: this.currentUser.userXZLCId,
        msg: this.value,
        time: CurrentTime
      }
      chat(this.$route.params.userId, obj)
      this.chatList.push({
        picUrl: this.currentUser.userAvatar,
        say: this.value,
        tag: 'MY_MSG'
      })
      this.value = ''
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
