<template>
    <div class="chat-page">
        <InformationBar :listData="currentChatList"></InformationBar>
      <router-view></router-view>
    </div>
</template>

<script>
import InformationBar from '../components/InformationBar'
import { chat, MsgResult } from '../api/SocketApi'
export default {
  name: 'Chat',
  mounted () {
    chat(1000, '在吗')
    MsgResult()
  },
  components: {
    InformationBar
  },
  data () {
    return {
      currentChatList: [
        {
          name: '二向箔',
          picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
          newMsg: '吃饭没',
          time: '12:34'
        },
        {
          name: '哑戏',
          picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599549853964&di=9957797346059d196bd2fc16020068e8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F17%2F20170717101419_zR4ta.thumb.700_0.jpeg',
          newMsg: '稍等一会儿',
          time: '12:41'
        },
        {
          name: '二向箔',
          picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
          newMsg: '吃饭没',
          time: '12:34'
        },
        {
          name: '哑戏',
          picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599549853964&di=9957797346059d196bd2fc16020068e8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F17%2F20170717101419_zR4ta.thumb.700_0.jpeg',
          newMsg: '稍等一会儿',
          time: '12:41'
        },
        {
          name: '二向箔',
          picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
          newMsg: '吃饭没',
          time: '12:34'
        },
        {
          name: '哑戏',
          picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599549853964&di=9957797346059d196bd2fc16020068e8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F17%2F20170717101419_zR4ta.thumb.700_0.jpeg',
          newMsg: '稍等一会儿',
          time: '12:41'
        },
        {
          name: '二向箔',
          picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
          newMsg: '吃饭没',
          time: '12:34'
        },
        {
          name: '哑戏',
          picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599549853964&di=9957797346059d196bd2fc16020068e8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F17%2F20170717101419_zR4ta.thumb.700_0.jpeg',
          newMsg: '稍等一会儿',
          time: '12:41'
        },
        {
          name: '二向箔',
          picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
          newMsg: '吃饭没',
          time: '12:34'
        },
        {
          name: '哑戏',
          picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599549853964&di=9957797346059d196bd2fc16020068e8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F17%2F20170717101419_zR4ta.thumb.700_0.jpeg',
          newMsg: '稍等一会儿',
          time: '12:41'
        },
        {
          name: '二向箔',
          picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
          newMsg: '吃饭没',
          time: '12:34'
        },
        {
          name: '哑戏',
          picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599549853964&di=9957797346059d196bd2fc16020068e8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F17%2F20170717101419_zR4ta.thumb.700_0.jpeg',
          newMsg: '稍等一会儿',
          time: '12:41'
        }
      ]
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
