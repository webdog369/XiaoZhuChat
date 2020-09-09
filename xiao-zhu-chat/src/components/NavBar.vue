<template>
   <div class="navbar">
     <h1>消息</h1>
     <div class="btns">
       <div class="search"></div>
       <div class="more" @click="more"></div>
     </div>
     <transition
     :css="false"
     @enter="enter"
     @leave="leave"
     >
     <div class="more-info" v-show="isMore">
       <div class="item">
         <i></i>
         <span>添加朋友</span>
       </div>
     </div>
     </transition>
   </div>
</template>

<script>
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'NavBar',
  data () {
    return {
      isMore: false
    }
  },
  methods: {
    more () {
      this.isMore = !this.isMore
    },
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 300 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.flipYOut', { duration: 300 }, function () {
        done()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.navbar{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  background: #eee;
  display: flex;
  justify-content: space-between;
  z-index: 999;
  h1{
    font-size: 30px;
    font-weight: bold;
    line-height: 80px;
    margin-left: 15px;
    color: #333;
  }
  .btns{
    width: 180px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div{
      background-repeat: no-repeat;
      background-size: cover;
    }
    .search{
      width: 50px;
      height: 50px;
      background-image:url("../assets/images/search.png");
    }
    .more{
      width: 60px;
      height: 60px;
      background-image:url("../assets/images/more.png");
    }
  }
  .more-info{
    position: absolute;
    right: 10px;
    top: 90px;
    width: 250px;
    background:#333;
    border-radius: 8px;
    &::after{
      position: absolute;
      content: '';
      top: -8px;
      right: 20px;
      width: 30px;
      height: 30px;
      background:#333;
      transform: rotate(45deg);
      z-index: -1;
    }
    .item{
      width: 100%;
      height: 80px;
      padding-top: 10px;
      padding-bottom: 10px;
      display: flex;
      justify-content: start;
      align-items: center;
      i{
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-left: 10px;
        margin-right: 10px;
        background-image: url("./../assets/images/add_friend.png");
        background-size: cover;
        background-repeat: no-repeat;
      }
      span{
        flex: 1;
        text-align: center;
        line-height: 80px;
        font-size: 28px;
        /*border-bottom: 1px solid #eee;*/
        color: #fff;
      }
    }
  }
}
</style>
