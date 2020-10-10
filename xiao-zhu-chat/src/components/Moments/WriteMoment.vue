<template>
    <div class="WriteMoment">
        <div class="header">
            <img class="header-left"
                 src="../../assets/images/back.png"
                 @click.stop="back"
            />
            <p @click.stop="sendMoment">发布</p>
        </div>
        <div class="bottom">
            <textarea class="content"
                      placeholder="这一刻的想法..."
                      v-model="contentText"
            >
            </textarea>
          <van-uploader
            :after-read="afterRead"
            :before-delete='beforeDelete'
            v-model="imgFileList"
            multiple :max-count="9"
          />
          <div class="allow" @click="showPopup">
                <div class="left">
                    <img src="../../assets/images/allow.svg" alt="">
                    <p>谁可以看</p>
                </div>
                <span>{{popupList[currentSelect]}}</span>
                <img src="../../assets/images/right.svg" alt="">
            </div>
        </div>
      <van-popup
        ref="popup"
        v-model="show"
        position="bottom"
        :style="{ height: '280px'}"
      >
       <p
         v-for="(value,index) in popupList"
         :key="index"
         :class="{'active':currentSelect === index}"
         @click.stop="select(value,index)"
       >{{value}}</p>
      </van-popup>
    </div>
</template>

<script>
import { userWriteMoment } from '../../api'
import { mapGetters, mapActions } from 'vuex'
import { formatTime } from '../../tools/tools'
import Vue from 'vue'
import { Popup, Uploader } from 'vant'
Vue.use(Popup)
Vue.use(Uploader)
export default {
  name: 'WriteMoment',
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data () {
    return {
      imgFileList: [],
      currentSelect: 0,
      isShowUpLoading: true,
      List: [],
      contentText: '',
      show: false,
      popupList: ['公开', '好友可见', '仅自己可见'],
      pics: [],
      picNum: 0
    }
  },
  methods: {
    ...mapActions([
      'setTips'
    ]),
    back () {
      this.$router.go(-1)
    },
    afterRead (data) {
      // let length = 0
      // const time = formatTime(new Date()).substr(0, 10)
      const fm = new FormData()
      fm.append('momentImages', data.file)
      fm.append('fileName', new Date().getTime() + '')
      // userSearchMoment(this.currentUser.userXZLCId).then(result => {
      //   for (const value of result.result) {
      //     const momentTime = value.time.substr(0, 10)
      //     if (momentTime === time) {
      //       length++
      //     }
      //   }
      // this.picNum++
      // 图片格式
      // this.pics.push(`http://localhost:3000/moment_images/${this.currentUser.userXZLCId}/${time}/${length}/${this.picNum}`)
      // })
    },
    beforeDelete (data, detail) {
      console.log(data, detail)
      this.pics.splice(detail.index, 1)
      return true
    },
    showPopup (e) {
      this.show = true
    },
    select (value, index) {
      this.currentSelect = index
      this.show = false
    },
    sendMoment () {
      if (!this.contentText.length) {
        this.setTips('文字内容不能为空')
        return
      }
      const time = formatTime(new Date())
      const momentData = {
        userXZLCId: this.currentUser.userXZLCId,
        content: this.contentText,
        pics: this.pics,
        time: time,
        likeUser: [],
        competence: this.currentSelect
      }
      userWriteMoment(momentData).then(msg => {
        // this.setTips(msg.)
        console.log(msg)
        this.$router.push({ path: '/Moments' })
      })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
 .WriteMoment{
    position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background: #ffffff;
     z-index: 9999;
     .header{
         width: 100%;
         height: 80px;
         background: #eee;
         display: flex;
         justify-content: space-between;
         align-items: center;
         img{
             width: 50px;
             height: 50px;
             margin-left: 20px;
         }
         p{
             width: 100px;
             height: 50px;
             margin-right: 20px;
             border-radius: 5px;
             background: #1082FF;
             font-size: 24px;
             color: #f6f6f6;
             text-align: center;
             line-height:50px;
         }
     }
     .bottom{
         width: 100%;
         padding: 20px 20px;
         box-sizing: border-box;
         .content{
             display: block;
             overflow: scroll;
             width:100%;
             height: 300px;
             border: none;
             /*background: #f5d7d9;*/
             /*padding: 20px 20px;*/
             /*box-sizing: border-box;*/
             font-size: 22px;
             color: #575757;
             &::placeholder {
                 font-size: 28px;
                 letter-spacing: 5px;
                 color: #666 !important;
             }
         }
         .allow{
             width: 100%;
             height: 100px;
             border-bottom: 1px solid #d0d0d0;
             box-sizing: border-box;
             display: flex;
             justify-content: space-between;
             align-items: center;
             .left{
                 flex: 1;
                 /*background: #f3b6be;*/
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 img{
                     width: 35px;
                     height: 35px;
                     margin-right: 15px;
                 }
                 p{
                     flex: 1;
                     font-size: 28px;
                     color:#575757;
                     line-height: 100px;
                 }
             }
             span{
               font-size: 28px;
               color: #666;
               margin-right: 15px;
             }
             img{
               width: 35px;
               height: 35px;
             }
         }
     }
     .van-popup{
      p{
        text-align: center;
        line-height: 90px;
        border-bottom: 1px solid #eee;
        &.active{
          background-image: url('../../assets/images/select.png');
          background-size: 5%;
          background-repeat: no-repeat;
          background-position: 95% center;
        }
      }
     }
 }
</style>
<style>
  /*预览图片样式*/
  .van-uploader__preview .van-image {
    width: 167px;
    height: 167px;
  }
  /*预览图片删除按钮样式*/
  .van-uploader__preview-delete{
    width: 50px;
    height: 50px;
  }
  /*预览图片索引样式*/
  .van-image-preview__index{
    font-size: 32px;
  }
  /*预览图片索引样式*/
  .van-icon{
    font-size: 55px;
  }
  /*添加图片按钮样式*/
  .van-uploader__upload{
    width: 167px;
    height: 167px;
  }
</style>
