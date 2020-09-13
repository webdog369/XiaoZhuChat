<template>
<div class="user-detail">
  <ReturnNavBar :title="'设置'"></ReturnNavBar>
  <RouterBar :data="['用户名',currentUser.userName]"></RouterBar>
  <RouterBar :data="['性别',currentUser.userSex]"></RouterBar>
</div>
</template>

<script>
import ReturnNavBar from '../ReturnNavBar'
import RouterBar from '../RouterBar'
import { mapGetters } from 'vuex'
// import { userUpData } from '../../api'
export default {
  name: 'UserDetail',
  components: {
    RouterBar,
    ReturnNavBar
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  methods: {
    save () {
      // userUpData()
    }
  }
}
</script>

<style scoped lang="scss">
.user-detail{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 110px;
  right: 0;
  background: #fff;
}
</style>
