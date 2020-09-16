<template>
    <div :class="['contact-person',{'noFiend':!ContactPersonData}]">
      <div class="no-friend" v-show="!ContactPersonData">
        <i></i>
        <span>点击加号添加好友</span>
        <p>联系人空空如也~</p>
      </div>
      <InformationBar :listData="ContactPersonData"></InformationBar>
    </div>
</template>

<script>
import InformationBar from '../components/InformationBar'
import { userFriendList, userSearchOne } from '../api/index'
import { mapGetters } from 'vuex'
export default {
  name: 'ContactPerson',
  beforeMount () {
    userFriendList(this.currentUser.userXZLCId).then(data => {
      for (const key of data.result) {
        userSearchOne({
          friendId: key
        }).then(data => {
          this.ContactPersonData.push(data.data[0])
        })
      }
    })
  },
  components: {
    InformationBar
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data () {
    return {
      ContactPersonData: []
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
  text-align: center;
  &.noFiend{
    background-image: url('../assets/images/no_friend.png');
    background-size: 25%;
    background-position: center;
    background-repeat: no-repeat;
  }
  /*background:lightblue;*/
  .no-friend{
    position: relative;
    width: 100%;
    height: 100%;
    i{
      position: absolute;
      right: 50px;
      top: 30px;
      width: 100px;
      height: 100px;
      background-image: url('../assets/images/right_top_corner.png');
      background-size: cover;
    }
    span{
      position: absolute;
      right: 100px;
      top: 150px;
      height: 50px;
      width: 250px;
      padding: 5px;
      line-height: 50px;
      background:#1082FF;
      color: #fff;
      border-radius: 15px;
    }
    p{
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translateX(-50%);
      display: inline-block;
      width: 100%;
      height: 100px;
      line-height: 100px;
      font-size: 35px;
      color: #999;
    }
  }
}

</style>
