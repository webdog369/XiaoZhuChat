<template>
      <div class="moments" ref="moments" id="moments">
        <router-link tag="i" class="camera" to="/Moments/writeMoment">
          <img src="../assets/images/camera.svg" alt="">
        </router-link>
          <ScrollView ref="scrollview">
              <div class="list" ref="list">
                  <div class="img-container">
                      <!--需要外界传递图片地址(path)-->
<!--                      <img src="../assets/images/MomentBg.jpg" alt="" ref="top">-->
                  </div>
                  <MomentPage></MomentPage>
              </div>
          </ScrollView>
          <router-view></router-view>
      </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import MomentPage from '../components/Moments/MomentPage'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Moments',
  components: {
    MomentPage,
    ScrollView
  },
  created () {
  },
  // 已经将编译好的模板挂载到页面的指定容器中, mounted ()此时已经可以拿到组件中的元素
  mounted () {
    // console.log(defaultHeight) // 829
    this.$refs.scrollview.scrolling(offsetY => {
      if (offsetY > 0) {
        // console.log('向下滚动')  图片会越来越大
        const scale = 100 + offsetY * 0.1
        // console.log(scale)  向下滚动数会越来越大
        this.$refs.moments.style.backgroundSize = `${scale}%`
      } else if (offsetY < -500) {
        this.$refs.moments.style.zIndex = 998
      } else {
        this.$refs.moments.style.zIndex = 1000
      }
      this.pageScrollY = offsetY
    })
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'momentScrollY'
    ])
  },
  data () {
    return {
      friendIdList: [],
      pageScrollY: 0
    }
  },
  methods: {
    ...mapActions([
      'setMomentScrollY'
    ])
  },
  beforeRouteLeave (to, from, next) {
    this.setMomentScrollY(this.pageScrollY)
    next()
  }
}
</script>

<style scoped lang="scss">
.moments {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 110px;
  z-index: 1000;
  background-image: url('../assets/images/MomentBg.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center 0;
  i{
    position: fixed;
    top: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    /*background: #dddddd;*/
    img{
      width: 100%;
      height: 100%;
    }
  }
    .img-container{
        width: 100%;
        /*此高度为计算后的黄金分割比*/
        height: 388px;
        overflow: hidden;
        margin-top: 80px;
        img{
            width: 100%;
            height: 500px;
        }
    }
}

</style>
