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
  data () {
    return {
      value: '',
      phone: false,
      chatList: [
        {
          name: '哑戏',
          userId: '001',
          picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599549853964&di=9957797346059d196bd2fc16020068e8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F17%2F20170717101419_zR4ta.thumb.700_0.jpeg',
          say: '你吃饭了没有?',
          time: '20:57',
          tag: 'FRIEND_MSG'
        },
        {
          name: '二向箔',
          userId: '001',
          picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
          say: '吃了,吃的面包',
          time: '20:58',
          tag: 'MY_MSG'
        },
        {
          name: '二向箔',
          userId: '001',
          picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
          say: '你吃了吗?',
          time: '20:58',
          tag: 'MY_MSG'
        },
        {
          name: '哑戏',
          userId: '001',
          picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599549853964&di=9957797346059d196bd2fc16020068e8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F17%2F20170717101419_zR4ta.thumb.700_0.jpeg',
          say: '刚吃过',
          time: '20:57',
          tag: 'FRIEND_MSG'
        },
        {
          name: '二向箔',
          userId: '001',
          picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
          say: '吃的什么呀?',
          time: '20:58',
          tag: 'MY_MSG'
        },
        {
          name: '哑戏',
          userId: '001',
          picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599549853964&di=9957797346059d196bd2fc16020068e8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F17%2F20170717101419_zR4ta.thumb.700_0.jpeg',
          say: '去食堂打的米饭菜 🍚',
          time: '20:57',
          tag: 'FRIEND_MSG'
        },
        {
          name: '二向箔',
          userId: '001',
          picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
          say: '哦哦',
          time: '20:58',
          tag: 'MY_MSG'
        }
      ]
    }
  },
  methods: {
    enterMsg (e) {
      const obj = {
        name: '二向箔',
        userId: '001',
        picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
        say: this.value,
        time: '20:58',
        tag: 'MY_MSG'
      }
      this.chatList.push(obj)
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
