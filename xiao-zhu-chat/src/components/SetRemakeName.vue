<template>
  <div class="remakeName">
    <input type="text" placeholder="给好友添加个好记的名字吧~" v-model="rnValue">
    <button
      :class="{'active':rnValue.length}"
      @click.stop="add"
    >{{rnValue.length?'完成':'暂不添加'}}</button>
  </div>
</template>

<script>
import { setRemakeName } from '../api'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SetRemakeName',
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data () {
    return {
      rnValue: ''
    }
  },
  methods: {
    ...mapActions([
      'setTips'
    ]),
    add () {
      if (this.rnValue.length) {
        console.log(this.$route.params.id)
        setRemakeName(this.currentUser.userXZLCId, {
          friendId: this.$route.params.id,
          remakeName: this.rnValue
        }).then(data => {
          this.setTips(data.data.msg)
          this.$router.go(-1)
        })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .remakeName{
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #eee;
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    padding-top: 15px;
    z-index: 9999;
    input{
      flex: 1;
      height: 80px;
      border:none;
      background: #eee;
      font-size: 30px;
      outline: none;
      border-bottom: 1px solid #ccc;
      padding-left: 15px;
      padding-right: 15px;
      margin-right: 5px;
    }
    button{
      height: 80px;
      width: 150px;
      color: #fff;
      font-size: 28px;
      border:none;
      margin-right: 20px;
      border-radius: 10px;
      background: #4886c7;
      &.active{
        background: #1082FF;
      }
    }
  }
</style>
