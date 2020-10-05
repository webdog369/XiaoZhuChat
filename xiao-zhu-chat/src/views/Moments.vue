<template>
      <div class="moments" ref="moments">
        <router-link tag="i" class="camera" to="/Moments/writeMoment">
          <img src="../assets/images/camera.svg" alt="">
        </router-link>
          <ScrollView ref="scrollview">
              <div class="list" ref="list">
                  <div class="img-container">
                      <!--需要外界传递图片地址(path)-->
<!--                      <img src="../assets/images/MomentBg.jpg" alt="" ref="top">-->
                  </div>
                  <MomentPage :userMoments="userMoments"></MomentPage>
              </div>
          </ScrollView>
          <router-view></router-view>
      </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import MomentPage from '../components/Moments/MomentPage'
export default {
  name: 'Moments',
  components: {
    MomentPage,
    ScrollView
  },
  // 已经将编译好的模板挂载到页面的指定容器中, mounted ()此时已经可以拿到组件中的元素
  mounted () {
    // console.log(defaultHeight) // 829
    this.$refs.scrollview.scrolling((offsetY) => {
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
    })
  },
  data () {
    return {
      userMoments: [
        {
          userName: '小朱',
          userAvatar: 'http://localhost:3000/userAvatar/avatar_1000.jpeg',
          content: '姜子牙,你可知罪!',
          pics: [],
          likeNum: 0,
          time: '2020年10月6日 01:06'
        },
        {
          userName: '小朱',
          userAvatar: 'http://localhost:3000/userAvatar/avatar_1000.jpeg',
          content: '姜子牙,你可知罪!',
          pics: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130584&di=ec14ebed57ffe19260d491d4bcbbbce7&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fb9bf4f33ly1ghsujm7vytj20u016ktia.jpg'
          ],
          likeNum: 0,
          time: '2020年10月6日 01:06'
        },
        {
          userName: '小朱',
          userAvatar: 'http://localhost:3000/userAvatar/avatar_1000.jpeg',
          content: '姜子牙,你可知罪!',
          pics: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130584&di=ec14ebed57ffe19260d491d4bcbbbce7&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fb9bf4f33ly1ghsujm7vytj20u016ktia.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130584&di=ec14ebed57ffe19260d491d4bcbbbce7&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fb9bf4f33ly1ghsujm7vytj20u016ktia.jpg'
          ],
          likeNum: 0,
          time: '2020年10月6日 01:06'
        },
        {
          userName: '小朱',
          userAvatar: 'http://localhost:3000/userAvatar/avatar_1000.jpeg',
          content: '姜子牙,你可知罪!',
          pics: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130584&di=ec14ebed57ffe19260d491d4bcbbbce7&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fb9bf4f33ly1ghsujm7vytj20u016ktia.jpg'
          ],
          likeNum: 0,
          time: '2020年10月6日 01:06'
        },
        {
          userName: '小朱',
          userAvatar: 'http://localhost:3000/userAvatar/avatar_1000.jpeg',
          content: '姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!姜子牙,你可知罪!',
          pics: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130585&di=176a0f0ab02b9c29f5f3cab3bcd38d54&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fohglpohpov.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601928130584&di=ec14ebed57ffe19260d491d4bcbbbce7&imgtype=0&src=http%3A%2F%2Femoji.cdn.bcebos.com%2Fyunque%2Fb9bf4f33ly1ghsujm7vytj20u016ktia.jpg'
          ],
          likeNum: 0,
          time: '2020年10月6日 01:06'
        }

      ]
    }
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
        height: 500px;
        overflow: hidden;
        position: relative;
        img{
            width: 100%;
            height: 500px;
        }
    }
}

</style>
