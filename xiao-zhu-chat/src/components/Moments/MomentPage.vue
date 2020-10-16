<template>
    <div class="MomentBottom">
        <p class="name">{{this.personMoment.personMoment?this.personMoment.userName:this.currentUser.userName}}</p>
        <img
          class="avatar"
          :src="this.personMoment.personMoment?this.personMoment.userAvatar:this.currentUser.userAvatar"
          alt=""
          @click="goDetail(userId)"
        >
        <div class="list">
            <div class="personal"
            v-for="(value, index) in userMoments"
            :key="value._id"
            >
                <div class="left">
                    <img
                      class="photo"
                      :src="value.userAvatar"
                      @click.stop="goDetail(value.userId)"
                    />
                </div>
                <div class="right">
                    <div class="nickname">
                        <p>{{value.remakeName?value.remakeName:value.userName}}</p>
                        <span>{{popupList[value.competence]}}</span>
                    </div>
                    <div class="review">
                        <p>{{value.content}}</p>
                        <div class="grid">
                          <div class="pic"
                               v-for="(v,i) in value.pics"
                               :key="i"
                               @click.stop="showPic(v)"
                          > <img :src="v"></div>
                        </div>
                    </div>
                    <div class="personal-bottom">
                        <p class="time">{{value.time}}</p>
                        <p class="control" @click.stop="likeIt(value._id,index)">
                          <span :class="{'like-active':value.like}"></span>
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
                    >{{v.remakeName?v.remakeName:v.userName}}{{value.likeList.length>1?'，':''}}</span>
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
import { searchFriendMoment, userFriendList, userSearchOne, userLike } from '../../api'
export default {
  name: 'MomentPage',
  created () {
    const friendIdList = []
    // 查找用户好友列表
    userFriendList(this.currentUser.userXZLCId).then(friendList => {
      if (!this.personMoment.personMoment) {
        friendIdList.push(this.currentUser.userXZLCId)
        // 遍历好友列表 取出好友id
        for (const value of friendList.result) {
          friendIdList.push(value.userId)
        }
      } else {
        friendIdList.push(this.personMoment.userId)
      }
      // 利用好友id查到所有好友的朋友圈
      searchFriendMoment({
        friendIdList: friendIdList
      }).then(data => {
        data.data.result.map((v, i) => {
          // 若查看非本人朋友圈 且朋友圈带有权限 则不push这条朋友圈
          const canSee = v.competence === 2 && v.userId !== this.currentUser.userXZLCId
          const friendCanSee = v.competence === 1 && friendIdList.indexOf(v.userId) === -1
          if (canSee || friendCanSee) return
          userSearchOne({
            friendId: v.userId
          }).then(data => {
            const obj = v
            obj.userAvatar = data.data[0].userAvatar
            obj.userName = data.data[0].userName
            obj.likeList = []
            obj.like = false
            // 如果这条说说不是用户自己的 就没必要显示权限内容了
            if (obj.userId !== this.currentUser.userXZLCId) obj.competence = 3
            // 遍历点赞列表 查找点赞用户的信息
            for (const key of v.likeUser) {
              userSearchOne({
                friendId: key
              }).then(res => {
                // 查询点赞好友里是否是我的好友并且好友是否有备注
                for (const value of friendList.result) {
                  if (value.userId === res.data[0].userXZLCId) {
                    res.data[0].remakeName = value.remakeName
                  }
                }
                obj.likeList.push(res.data[0])
              })
              // 如果自己点过赞 就再添加一条flag
              if (key === this.currentUser.userXZLCId) {
                obj.like = true
              }
            }
            // 查询该条朋友圈的好友是否有备注
            for (const value of friendList.result) {
              if (value.userId === obj.userId) {
                obj.remakeName = value.remakeName
              }
            }
            this.userMoments.unshift(obj)
          })
        })
      })
    })
    // 朋友圈头像跳转
    if (this.personMoment.personMoment) {
      this.userId = this.personMoment.userId
    } else {
      this.userId = this.currentUser.userXZLCId
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data () {
    return {
      userMoments: [],
      userId: null,
      popupList: ['公开', '好友可见', '仅自己可见']
    }
  },
  props: {
    personMoment: {
      type: Object,
      default: () => {
        return {
          personMoment: false,
          userId: null,
          userName: '',
          userAvatar: ''
        }
      },
      require: true
    }
  },
  methods: {
    showPic (url) {
      this.$router.push({ path: `/showAvatar/${this.currentUser.userXZLCId}`, query: { src: url } })
    },
    likeIt (id, index) {
      // 切换点赞图标状态
      this.userMoments[index].like = !this.userMoments[index].like
      // 修改点赞列表
      let flag = true
      this.userMoments[index].likeList.map((v, i) => {
        if (v.userXZLCId === this.currentUser.userXZLCId) {
          // 如果找到了 就代表点赞过了 现在要执行取消点赞操作
          this.userMoments[index].likeList.splice(i, 1)
          flag = false
          console.log('已取消点赞')
        }
      })
      if (flag) {
        this.userMoments[index].likeList.unshift(this.currentUser)
        console.log('点赞成功')
      }

      // 数据库同步点赞数据
      userLike(id, { userXZLCId: this.currentUser.userXZLCId })
    },
    goDetail (id) {
      console.log(id)
      const myId = this.currentUser.userXZLCId
      if (id === myId) {
        this.$router.push({ path: '/Mine' })
      } else {
        this.$router.push({ path: `/friendDetail/${id}` })
      }
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
        /*height: 100%;*/
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
                    display: flex;
                     justify-content: space-between;
                    /*background: #a800dd;*/
                    p{
                        padding-left: 10px;
                        box-sizing: border-box;
                        font-size: 32px;
                        font-weight: bold;
                        color: rgb(64,97,128);
                    }
                    span{
                     font-size: 24px;
                      margin-right: 15px;
                      color: #ccc;
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
                        .pic{
                            position: relative;
                            display: inline-block;
                            width: 190px;
                            height:190px;
                            margin-top: 15px;
                            margin-right: 10px;
                            overflow: hidden;
                            img{
                              position: absolute;
                              left: 50%;
                              transform: translateX(-50%);
                              height: 100%;
                            }
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
                            background-size:90%;
                            background-position: center;
                            background-repeat: no-repeat;
                            vertical-align: middle;
                            background-image: url('../../assets/images/like_icon.png');
                          &.like-active{
                            background-image: url('../../assets/images/like_icon_active.png');
                          }
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
                  /*height: 50px;*/
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
