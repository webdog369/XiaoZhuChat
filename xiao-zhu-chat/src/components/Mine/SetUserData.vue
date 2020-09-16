<template>
  <div class="setUserData">
    <ReturnNavBar :title="'修改'+title"></ReturnNavBar>
    <form class="userName" @submit.prevent="submit" v-show="this.title === '用户名'">
        <input type="text" v-model="value">
        <button type="submit" v-show="change">保存</button>
    </form>
    <div class="userSex" v-show="this.title === '性别'">
      <div v-for="(data,index) in sexList"
           :key="index"
           @click.stop="select(data,index)">{{data}}<i :class="{'active':value === data}"></i></div>
    </div>
    <div class="userState" v-show="this.title==='帐号状态'" >
      <div class="online"
           v-for="(data,index) in statesList"
           :key="index"
           @click.stop="setState (data, index)"
      >{{data}}<i :class="{'active':value === data}"></i></div>
      <button @click.stop="signOut">切换帐号</button>
    </div>
  </div>
</template>
<script>
import ReturnNavBar from '../ReturnNavBar'
import { userUpData } from '../../api'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SetUserData',
  components: {
    ReturnNavBar
  },
  mounted () {
    this.title = this.$route.query.title
    this.value = this.$route.query.value
    this.currentUserId = this.currentUser.userXZLCId
  },
  data () {
    return {
      currentUserId: '',
      title: '',
      value: '',
      change: false,
      sexList: ['男', '女'],
      statesList: ['在线', '忙碌', '请勿打扰', '隐身']
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'SelectTips'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentUser',
      'setTips',
      'setSelectTips'
    ]),
    submit (e) {
      userUpData(this.currentUserId, {
        key: 'userName',
        value: this.value
      })
      this.setCurrentUser({
        userName: this.value,
        userAvatar: this.currentUser.userAvatar,
        userXZLCId: this.currentUserId,
        userSex: this.currentUser.userSex,
        userState: this.currentUser.userState
      })
      this.setTips('修改成功')
      this.$router.go(-1)
    },
    select (currentSex, i) {
      this.value = currentSex
      const data = {
        key: 'userSex',
        value: currentSex
      }
      userUpData(this.currentUserId, data)
      this.setCurrentUser({
        userName: this.currentUser.userName,
        userAvatar: this.currentUser.userAvatar,
        userXZLCId: this.currentUserId,
        userState: this.currentUser.userState,
        userSex: currentSex
      })
      this.setTips('修改成功')
      this.$router.go(-1)
    },
    setState (data, index) {
      this.value = data
      this.setCurrentUser({
        userName: this.currentUser.userName,
        userAvatar: this.currentUser.userAvatar,
        userXZLCId: this.currentUserId,
        userSex: this.currentUser.userSex,
        userState: data
      })
      this.setTips(`已修改为${data}`)
      this.$router.go(-1)
    },
    signOut () {
      this.$router.push('/sign')
    }
  },
  watch: {
    value (n, o) {
      if (o !== '') {
        this.change = true
      }
    }
  }
  /*,
  // 设置导航守卫
  beforeRouteLeave (to, from, next) {
    if (this.SelectTips[2]) {
      next()
    } else {
      if (confirm('确定要退出帐号吗?')) {
        next()
      } else {
        next(false)
      }
    }
  } */
}
</script>

<style scoped lang="scss">
.setUserData{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 110px;
  background: #eee;
  .userName{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    input{
      flex: 1;
      height: 100%;
      border: none;
      outline: none;
      border-bottom: 1px solid #ccc;
      background: #fff;
    }
    button{
      width: 100px;
      height: 90%;
      background: #1082FF;
      border: none;
      border-radius: 5px;
      font-size: 26px;
      color: #fff;
    }
  }
  .userSex{
    width: 100%;
    height: 180px;
    background: #eee;
    div{
      width: 100%;
      height: 80px;
      line-height: 80px;
      margin-top: 5px;
      padding-left: 20px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i{
        display: inline-block;
        width: 40px;
        height: 40px;
        background-size: cover;
        margin-right: 45px;
        &.active{
          background-image: url('../../assets/images/select.png');
        }
      }
    }
  }
  .userState{
    width: 100%;
    height: 180px;
    background: #eee;
    div{
      width: 100%;
      height: 80px;
      line-height: 80px;
      margin-top: 5px;
      padding-left: 20px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i{
        display: inline-block;
        width: 40px;
        height: 40px;
        background-size: cover;
        margin-right: 45px;
        &.active{
          background-image: url('../../assets/images/select.png');
        }
      }
    }
    button{
      width: 100%;
      height: 80px;
      background: #1082FF;
      font-size: 28px;
      color: #fff;
      border:none;
      margin-top: 10px;
      border-radius: 5px;
    }
  }
}
</style>
