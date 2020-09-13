<template>
  <div class="setUserData">
    <ReturnNavBar :title="'修改'+title"></ReturnNavBar>
    <form class="userName" @submit.prevent="submit" v-show="this.title === '用户名'">
        <input type="text" v-model="value">
        <button type="submit" v-show="change">保存</button>
    </form>
    <div class="userSex" v-show="this.title === '性别'">
      <div class="boy" @click="select">男<i :class="{'active':value==='男'}"></i></div>
      <div class="boy" @click="select">女<i :class="{'active':value==='女'}"></i></div>
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
      change: false
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentUser',
      'setTips'
    ]),
    submit (e) {
      const value = this.value
      userUpData(this.currentUserId, {
        key: 'userName',
        value: value
      })
      this.setTips('修改成功')
      this.setCurrentUser({
        userName: this.value,
        userAvatar: this.currentUser.userAvatar,
        userXZLCId: this.currentUserId,
        userSex: this.currentUser.userSex
      })
      this.$router.go(-1)
    },
    select (e) {
      this.value = e.target.innerText
      const data = {
        key: 'userSex',
        value: this.value
      }
      userUpData(this.currentUserId, data)
      this.setTips('修改成功')
      this.setCurrentUser({
        userName: this.currentUser.userName,
        userAvatar: this.currentUser.userAvatar,
        userXZLCId: this.currentUserId,
        userSex: this.value
      })
      this.$router.go(-1)
    }
  },
  watch: {
    value (n, o) {
      if (o !== '') {
        this.change = true
      }
    }
  }
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
}
</style>
