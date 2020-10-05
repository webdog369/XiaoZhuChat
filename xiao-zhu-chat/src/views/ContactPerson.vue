<template>
    <div :class="['contact-person',{'no-friend-bg':noFriend}]" ref="contactPerson">
      <div class="new-friend" @click.stop="addFriend">
        <span></span>
        <p>新的朋友</p>
      </div>
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
import Vue from 'vue'
import { IndexBar, IndexAnchor } from 'vant'
Vue.use(IndexBar)
Vue.use(IndexAnchor)
export default {
  name: 'ContactPerson',
  beforeMount () {
    let flag = false
    // 根据当前用户id查找用户的好友列表
    userFriendList(this.currentUser.userXZLCId).then(data => {
      // 若获取到还有列表 则将列表中的好友id提取出来
      for (const key of data.result) {
        if (key.status === 1) {
          // 根据提取出来的好友id 查询到好友最新的详细个人信息
          userSearchOne({
            friendId: key.userId
          }).then(data => {
            // 将查询到的信息进行判断,状态为已添加(0)的好友push到ContactPersonData中
            const items = data.data[0]
            items.remakeName = key.userRemakeName
            this.ContactPersonData.push(items)
          })
          this.noFriend = false
          flag = true
        }
      }
      // 若当前用户没有好友则返回的是一个字符串  或者 找不到好友状态为已添加的好友 则显示无联系人
      if (typeof data.result === 'string' || !flag) {
        this.noFriend = true
      }
    })
  },
  components: {
    InformationBar,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor
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
  },
  methods: {
    addFriend () {
      this.$router.push({ path: '/addFriend' })
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
  .new-friend{
    width: 100%;
    height: 100px;
    background: #fff;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: 10px;
    span{
      display: inline-block;
      width: 80px;
      height: 80px;
      background-color: orange;
      background-image: url("../assets/images/add_friend.png");
      background-size: 60%;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 15px;
    }
    p{
      flex:1;
      text-align: left;
      margin-left: 20px;
      font-size: 28px;
      line-height: 100px;
      border-bottom: 1px solid #ccc;
    }
  }
}

</style>
