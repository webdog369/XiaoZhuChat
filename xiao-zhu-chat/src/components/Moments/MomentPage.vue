<template>
    <div class="MomentBottom">
        <p class="name">{{this.currentUser.userName}}</p>
        <img class="avatar" :src="this.currentUser.userAvatar" alt="">
        <div class="list">
            <div class="personal"
            v-for="(value, index) in userMoments"
            :key="value._id"
            >
                <div class="left">
                    <img class="photo" :src="value.userAvatar"/>
                </div>
                <div class="right">
                    <div class="nickname">
                        <p>{{value.userName}}</p>
                    </div>
                    <div class="review">
                        <p>{{value.content}}</p>
                        <div class="grid">
                            <img
                              v-for="(v,i) in value.pics"
                              :key="i"
                              :src="v">
                        </div>
                    </div>
                    <div class="personal-bottom">
                        <p class="time">{{value.time}}</p>
                        <p class="control" @click.stop="likeIt(value._id,index)">
                          <span></span>
                            <i>赞</i>
                        </p>
                    </div>
                  <div class="like-list"
                       v-show="value.likeList.length"
                  >
                    <span
                      v-for="v in value.likeList"
                      :key="v.userXZLCId"
                      @click.stop="goDetail(v.userXZLCId)"
                    >{{v.userName}}{{value.likeList.length>1?'，':''}}</span>
                     {{value.likeList.length>1?'等人觉得很赞':'觉得很赞'}}
                  </div>
                </div>
            </div>
             <p :class="['no-more',{'no-one':!userMoments.length}]"><i></i><span>暂时没有更多动态了</span><i></i></p>
        </div>
    </div>
</template>

<script>
// import ScrollView from '../ScrollView'
import { mapGetters } from 'vuex'
import { searchFriendMoment, userFriendList, userSearchOne } from '../../api'
export default {
  name: 'MomentPage',
  created () {
    const friendIdList = [this.currentUser.userXZLCId]
    // 查找用户好友列表
    userFriendList(this.currentUser.userXZLCId).then(data => {
      // 遍历好友列表 取出好友id
      for (const value of data.result) {
        friendIdList.push(value.userId)
      }
      // 利用好友id查到所有好友的朋友圈
      searchFriendMoment({
        friendIdList: friendIdList
      }).then(data => {
        data.data.result.map((v, i) => {
          userSearchOne({
            friendId: v.userId
          }).then(data => {
            const obj = v
            obj.userAvatar = data.data[0].userAvatar
            obj.userName = data.data[0].userName
            obj.likeList = []
            for (const key of v.likeUser) {
              userSearchOne({
                friendId: key
              }).then(res => {
                obj.likeList.push(res.data[0])
              })
            }
            this.userMoments.unshift(obj)
          })
        })
      })
    })
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data () {
    return {
      userMoments: []
    }
  },
  methods: {
    likeIt (id, index) {
      console.log(id)
      this.userMoments[index].likeList.unshift(this.currentUser)
    },
    goDetail (id) {
      this.$router.push({ path: `/friendDetail/${id}` })
    }
  }
}
</script>

<style scoped lang="scss">
.MomentBottom{
    position: relative;
    background: #fff;
    .name{
        position: absolute;
        top: -70px;
        right: 150px;
        font-size: 32px;
        line-height: 80px;
        font-weight: bold;
        color: #f6f6f6;
    }
    .avatar{
        position: absolute;
        top: -80px;
        right: 20px;
        width: 100px;
        height: 100px;
        border-radius: 15px;
    }
    .list{
        width: 100%;
        height: 100%;
        /*position: relative;*/
        .personal{
            width: 100%;
            /*height: 200px;*/
            /*background: #70bfd3;*/
            display: flex;
            margin-bottom: 30px;
            padding-top: 30px;
            .left{
                width: 15%;
                /*background: #dddddd;*/
                img{
                    width: 70%;
                    border-radius: 15px;
                    margin-left: 20px;
                }
            }
            .right{
                width: 85%;
                height: 100%;
                border-bottom: 1px solid #ccc;
                padding-bottom: 15px;
                box-sizing: border-box;
                /*background: #facc41;*/
                .nickname{
                    width: 100%;
                    height: 80px;
                    line-height: 85px;
                    /*background: #a800dd;*/
                    p{
                        padding-left: 10px;
                        box-sizing: border-box;
                        font-size: 32px;
                        font-weight: bold;
                        color: rgb(64,97,128);
                    }
                }
                .review{
                    width: 95%;
                    /*background: #ee9b9b;*/
                    padding: 10px 10px;
                    p{
                        width: 100%;
                        height: 100%;
                        font-size: 30px;
                        color: #333333;
                    }
                    .grid{
                        display: flex;
                        align-items: flex-start;
                        flex-wrap: wrap;
                        align-content: stretch;
                        img{
                            display: inline-block;
                            width: 190px;
                            height:190px;
                            margin-top: 15px;
                            margin-right: 10px;
                        }
                    }
                }
                .personal-bottom{
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    /*background: #ffffff;*/
                    display: flex;
                    justify-content: space-between;
                    .time{
                        padding-left: 10px;
                        box-sizing: border-box;
                        font-size: 28px;
                        color: #b9b9b9;
                    }
                    .control{
                        /*width: 100px;*/
                        height: 50px;
                        /*background: #42b983;*/
                        margin-right: 20px;
                        font-size: 28px;
                        color: #b9b9b9;
                        span{
                            display: inline-block;
                            width: 40px;
                            height:40px;
                            /*margin-bottom: 10px;*/
                            background-image: url('../../assets/images/like_icon_active.png');
                            background-size:90%;
                            background-position: center;
                            background-repeat: no-repeat;
                            vertical-align: middle;
                        }
                        i{
                            font-style:normal;
                            margin-left: 15px;
                            font-size: 28px;
                        }
                    }
                }
                .like-list{
                  width: 95%;
                  height: 50px;
                  background: #eee;
                  font-size: 26px;
                  padding-left: 10px;
                  span{
                    color: rgb(64,97,128);
                    line-height: 50px;
                    font-weight: bold;
                  }
                }
            }
        }
    }
    .no-more{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        line-height: 30px;
        text-align: center;
        font-size: 26px;
        color: #999;
        margin-left: 10px;
        margin-right: 10px;
      }
      i{
        flex: 1;
        height: 1px;
        background: #ddd;
      }
      &.no-one{
        width: 100%;
        height: 300px;
      }
    }
}
</style>
