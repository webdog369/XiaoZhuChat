<template>
    <div class="return-nav-bar">
      <div class="left">
        <div class="back" @click="$router.go(-1)"></div>
        <div class="title">{{title}}</div>
      </div>
      <div class="more" v-show="moreBtnShow"></div>
    </div>
</template>

<script>
export default {
  name: 'ReturnNavBar',
  props: {
    title: {
      type: String,
      default: '',
      require: false
    },
    moreBtnShow: {
      type: Boolean,
      default: true,
      require: false
    }
  }
}
</script>

<style scoped lang="scss">
.return-nav-bar{
  position: relative;
  width: 100%;
  height: 80px;
  background:rgb(230,230,230);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  z-index: 999;
  .left{
    display: flex;
    justify-content: start;
    align-items: center;
    flex: 1;
    .back{
      width: 50px;
      height: 50px;
      margin-left: 10px;
      margin-right: 15px;
      background-image:url("../assets/images/back.png");
      background-size: cover;
      background-repeat:no-repeat;
    }
    .title{
      font-size: 28px;
      font-weight: bold;
    }
  }
  .more{
    width: 50px;
    height: 50px;
    margin-right: 20px;
    background-image: url("../assets/images/more_msg.png");
    background-size: cover;
    background-repeat:no-repeat;
  }
}
</style>
