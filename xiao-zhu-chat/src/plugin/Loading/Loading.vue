<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
      <div class="Tips" v-show="isShow">
        <p>{{Tips}}</p>
      </div>
  </transition>
</template>

<script>
// import { mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'Tips',
  data () {
    return {
      Tips: '',
      isShow: false
    }
  },
  methods: {
    enter (el, done) {
      Velocity(el, 'transition.expandIn', { duration: 300 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.expandOut', { duration: 300 }, function () {
        done()
      })
    }
  }
}
</script>
<style scoped lang="scss">
.Tips{
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -35%;
  margin-top: -10%;
  width: 70%;
  height: 20%;
  background: rgba(0,0,0,.7);
  border-radius: 30px;
  z-index: 9999;
  /*display: none;*/
  p{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
  }
}
</style>
