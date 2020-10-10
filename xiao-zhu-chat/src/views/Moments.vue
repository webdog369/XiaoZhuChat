<template>
      <div class="moments" ref="moments" id="moments">
        <div class="return" @click.stop="goBack">
          <span></span>
          <b>返回</b>
        </div>
        <router-link tag="i" class="camera" to="/writeMoment">
          <img src="../assets/images/camera.svg" alt="">
        </router-link>
          <ScrollView ref="scrollview">
              <div class="list" ref="list">
                  <div class="img-container">
                      <!--需要外界传递图片地址(path)-->
<!--                      <img src="../assets/images/MomentBg.jpg" alt="" ref="top">-->
                  </div>
                  <MomentPage :personMoment="personMoment"></MomentPage>
              </div>
          </ScrollView>
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
    this.personMoment = this.$route.query
    // this.pageScrollY = this.momentScrollY
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
    // setTimeout(() => {
    //   this.$refs.scrollview.scrollTo(0, this.momentScrollY, 1)
    // }, 200)
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
      pageScrollY: 0,
      personMoment: {}
    }
  },
  methods: {
    ...mapActions([
      'setMomentScrollY'
    ]),
    goBack () {
      this.$router.go(-1)
    }
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
  .return{
    position: absolute;
    left: 15px;
    top: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      width: 40px;
      height: 40px;
      background-image: url('../assets/images/more_light_btn.png');
      background-size: cover;
      background-repeat: no-repeat;
      transform: rotate(180deg);
    }
    b{
      color: #fff;
      font-size: 32px;
      font-weight: lighter;
    }
  }
  .camera{
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
