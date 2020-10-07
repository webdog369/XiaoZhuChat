<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
    appear
  >
    <div class="show-avatar" @click.stop="goBack">
      <img :src="this.$route.query.src" :alt="this.$route.params.url">
    </div>
  </transition>
</template>

<script>
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'ShowAvatar',
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 300 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 300 }, function () {
        done()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.show-avatar{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;
  z-index: 10000;
  img{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
}
</style>
