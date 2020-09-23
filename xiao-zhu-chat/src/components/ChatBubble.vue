<template>
    <div class="scrollBox" ref="scrollBox">
      <ScrollView ref="scrollView">
      <div class="chat-bubble">
      <div class="chat-list"
           v-for="(value, index) in chatList"
           :key="index"
           ref="item"
      >
        <!--朋友发的信息-->
        <div class="friend-msg"
             v-if="value.tag==='FRIEND_MSG'"
        >
          <div class="avatar"
          :style="{backgroundImage:`url(${value.userAvatar})`}"
          ></div>
          <div class="bubble">{{value.friendMsg}}</div>
        </div>
        <!--自己发的信息-->
        <div class="my-msg"
        v-if="value.tag==='MY_MSG'"
        >
          <div class="avatar"
          :style="{backgroundImage:`url(${value.userAvatar})`}"
          ></div>
          <div class="bubble">{{value.friendMsg}}</div>
        </div>
      </div>
    </div>
     </ScrollView>
    </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
export default {
  name: 'ChatBubble',
  mounted () {
  },
  updated () {
  },
  components: {
    ScrollView
  },
  props: ['chatList'],
  watch: {
    chatList (n) {
      this.$nextTick(() => {
        this.chatList = n
        const i = n.length - 1
        const boxHeight = this.$refs.scrollBox.clientHeight
        const elOffsetTop = this.$refs.item[i].offsetTop
        const elHeight = this.$refs.item[i].clientHeight
        const y = elOffsetTop - boxHeight + elHeight
        if (elOffsetTop > boxHeight) {
          this.$refs.scrollView.scrollTo(0, -y, 50)
        }
        // 废弃方法:原因--如果使用scrollIntoView需要overflow:auto 会造成页面偏移
        // this.$refs.scrollView.refresh()
        // this.$refs.item[i].scrollIntoView(false)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .scrollBox{
    position: fixed;
    top: 80px;
    bottom: 110px;
    left: 0;
    right: 0;
    .chat-bubble{
      width: 100%;
      padding-top: 30px;
      padding-bottom: 20px;
      margin-left: 15px;
      .chat-list{
        .friend-msg{
          width: 100%;
          display: flex;
          margin-top: 30px;
          margin-bottom: 20px;
          .avatar{
            width: 80px;
            height: 80px;
            background-color: #666;
            border-radius: 15px;
            background-size: cover;
            background-repeat: no-repeat;
          }
          .bubble {
            position: relative;
            min-width: 40px;
            max-width: 450px;
            background: #FFF;
            padding: 15px;
            border-radius: 15px;
            color: #333;
            margin-left: 30px;
            font-size: 28px;
            line-height: 55px;
            word-wrap: break-word;
            &::after{
              position: absolute;
              content: '';
              left: -8px;
              top: 25px;
              width: 30px;
              height: 30px;
              transform:  rotateX(50deg) rotate(45deg) ;
              background:#FFF;
              z-index: -1;
            }
          }
        }
        .my-msg{
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
          margin-top: 30px;
          margin-bottom: 20px;
          .avatar{
            width: 80px;
            height: 80px;
            margin-right: 30px;
            background-color: #666;
            border-radius: 15px;
            background-size: cover;
            background-repeat: no-repeat;
          }
          .bubble {
            position: relative;
            min-width: 40px;
            max-width: 450px;
            background: #1082FF;
            padding: 15px;
            border-radius: 15px;
            color: #fff;
            margin-right: 30px;
            font-size: 28px;
            line-height: 55px;
            word-wrap: break-word;
            &::after{
              position: absolute;
              content: '';
              right: -8px;
              top: 25px;
              width: 30px;
              height: 30px;
              transform:  rotateX(-50deg) rotate(45deg) ;
              background: #1082FF;
              z-index:-1;
            }
          }
        }
      }
    }
  }

</style>
