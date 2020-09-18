<template>
    <div class="contact-person" ref="contactPerson">
      <div class="no-friend" v-show="noFriend">
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
    // 根据当前用户id查找用户的好友列表
    userFriendList(this.currentUser.userXZLCId).then(data => {
      // 若当前用户没有好友则返回的是一个字符串 若有好友 返回的是数组
      if (typeof data.result !== 'string') {
        // 若获取到还有列表 则将列表中的好友id提取出来
        for (const key of data.result) {
          // 根据提取出来的好友id 查询到好友最新的详细个人信息
          userSearchOne({
            friendId: key
          }).then(data => {
            // 将查询到的信息push到ContactPersonData中
            this.ContactPersonData.push(data.data[0])
          })
        }
      } else {
        // 若返回的是字符串 则说明该用户没有好友 则显示没有好友的样式
        this.$refs.contactPerson.classList.add('no-friend-bg')
        this.noFriend = true
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
      ContactPersonData: [],
      noFriend: false
    }
  },
  watch: {
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
  &.no-friend-bg{
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
