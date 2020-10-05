<template>
    <div class="WriteMoment">
        <div class="header">
            <img class="header-left"
                 src="../../assets/images/back.png"
                 @click.stop="back"
            />
            <p>发表</p>
        </div>
        <div class="bottom">
            <textarea class="content"
                      placeholder="这一刻的想法..."
            >
            </textarea>
            <div class="images">
                <img class="Img"
                     ref="Img"
                     src="https://c-ssl.duitang.com/uploads/item/202005/17/20200517204235_ohlfp.thumb.1000_0.jpg"
                     alt=""
                     v-for="(value,index) in Num"
                     :key="index"
                     @click.stop="delectItem(index)"
                >
                <p class="uploading" @click.stop="addImages" v-show="isShowUpLoading" ref="uploading"></p>
            </div>
            <div class="remind">
                <div class="left">
                    <img src="../../assets/images/remind.svg" alt="">
                    <p>提醒谁看</p>
                </div>
                <img src="../../assets/images/right.svg" alt="">
            </div>
            <div class="allow">
                <div class="left">
                    <img src="../../assets/images/allow.svg" alt="">
                    <p>谁可以看</p>
                </div>
                <img src="../../assets/images/right.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'WriteMoment',
  data () {
    return {
      Num: 0,
      isShowUpLoading: true,
      List: []
    }
  },
  methods: {
    back () {
      history.back()
    },
    // 增加一个图片
    addImages () {
      console.log('增加一个')
      if (this.Num >= 9) {
        this.Num = 9
      } else {
        console.log(this.Num)
        this.Num = this.Num + 1
      }
      if (this.Num === 9) {
        this.isShowUpLoading = false
      }
    },
    // 删除当前选中图片
    delectItem (inedx) {
      console.log('删除当前的这张', inedx)
      this.$refs.Img[inedx].classList.add('active')
      this.Num = this.$refs.Img.length - 1
      console.log(this.Num)
      if (inedx < 9) {
        this.isShowUpLoading = true
      } else if (inedx < 1) {
        inedx = 1
      }
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
     .header{
         width: 100%;
         height: 100px;
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
             width: 120px;
             height: 60px;
             margin-right: 20px;
             border-radius: 15px;
             background: #1082FF;
             font-size: 26px;
             color: #f6f6f6;
             text-align: center;
             line-height:60px;
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
         .images{
             width: 100%;
             background: #f3b6be;
             display: flex;
             justify-content: flex-start;
             flex-wrap: wrap;
             border-bottom: 1px solid #d0d0d0;
             padding-bottom: 15px;
             box-sizing: border-box;
             .uploading{
                 width: 215px;
                 height: 215px;
                 background: #dddddd;
                 margin-top: 15px;
                 margin-left: 15px;
             }
             .Img{
                 display:block;
                 width: 215px;
                 height: 215px;
                 background: #575757;
                 margin-top: 15px;
                 margin-left: 15px;
                 &.active{
                     display: none;
                 }
             }
         }
         .remind{
             width: 100%;
             height: 100px;
             border-bottom: 1px solid #d0d0d0;
             box-sizing: border-box;
             display: flex;
             justify-content: space-between;
              .left{
                  width: 220px;
                  /*background: #f3b6be;*/
                  display: flex;
                  justify-content: space-between;
                  img{
                      width: 50px;
                      height: 50px;
                      margin-top: 25px;
                      margin-left: 10px;
                  }
                  p{
                      font-size: 32px;
                      color:#575757;
                      line-height: 100px;
                  }
              }
         }
         .allow{
             width: 100%;
             height: 100px;
             border-bottom: 1px solid #d0d0d0;
             box-sizing: border-box;
             display: flex;
             justify-content: space-between;
             .left{
                 width: 220px;
                 /*background: #f3b6be;*/
                 display: flex;
                 justify-content: space-between;
                 img{
                     width: 50px;
                     height: 50px;
                     margin-top: 25px;
                     margin-left: 10px;
                 }
                 p{
                     font-size: 32px;
                     color:#575757;
                     line-height: 100px;
                 }
             }
         }
     }
 }
</style>
