<template>
  <transition appear>
    <div class="contact-person">
      <InformationBar :listData="ContactPersonData"></InformationBar>
    </div>
  </transition>
</template>

<script>
import InformationBar from '../components/InformationBar'
export default {
  name: 'ContactPerson',
  components: {
    InformationBar
  },
  data () {
    return {
      ContactPersonData: [
        {
          name: '二向箔',
          picUrl: 'https://t9.baidu.com/it/u=2203852750,1534126073&fm=193',
          remakeName: '朱鼎国'
        },
        {
          name: '哑戏',
          picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599549853964&di=9957797346059d196bd2fc16020068e8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F17%2F20170717101419_zR4ta.thumb.700_0.jpeg',
          remakeName: '冯舒悦'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.contact-person{
  position: fixed;
  left: 0;
  right: 0;
  top: 80px;
  bottom: 110px;
  background:lightblue;
}
/*.v-enter{
  transform: translateX(100%);
}
.v-enter-active{
  transition: all .3s ease-in-out;
}
.v-enter-to{
  transform: translateX(0%);
}*/
.v-leave{
  transform: translateX(0%);
}
.v-leave-active{
  transition: all .3s ease-in-out;
}
.v-leave-to{
  transform: translateX(-100%);
}
</style>
