<template>
    <div class="RouterBar" @click="go">
      <span class="title">{{data[0]}}</span>
      <span class="value">{{data[1]}}</span>
      <i></i>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'RouterBar',
  props: {
    data: {
      type: Array,
      default: () => ['标题', '内容'],
      require: true
    }
  },
  methods: {
    go () {
      this.$router.push(`/Mine/set?title=${this.data[0]}&value=${this.data[1]}`)
    }
  }
}
</script>

<style scoped lang="scss">
.RouterBar{
  width: 100%;
  height: 80px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  font-size: 28px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 2px solid #eee;
  .title{
    flex: 1;
  }
  .value{
    color: #333;
  }
  i{
    display: inline-block;
    width: 35px;
    height: 35px;
    background-image: url('../assets/images/more_dark.png');
    background-size: cover;
    margin-right: 25px;
    margin-left: 15px;
  }
}
</style>
