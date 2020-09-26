<template>
  <ScrollView ref="scrollView">
    <div  class="information-bar">
        <div class="items" v-for="(value) in listData" :key="value.userName">
          <i :style="{backgroundImage:`url(${value.userAvatar})`}"></i>
          <div class="data" @click.stop="goChat(value.userXZLCId,value.remakeName?value.remakeName:value.userName)">
            <div class="info">
              <h2
                :class="{'card':!value.newMsg}"
              >{{value.remakeName?value.remakeName:value.userName}}</h2>
              <span class="msg" v-if="value.newMsg">{{value.newMsg}}</span>
            </div>
            <div class="right">
              <div class="time" v-if="value.time">{{value.time}}</div>
              <span class="tips" v-if="value.tips">3</span>
            </div>
          </div>
        </div>
      <van-skeleton
        title avatar
        avatar-size="80px"
        title-width="25%"
        v-for="i in 12" :key="i" :loading="loading"/>
    </div >
  </ScrollView>
</template>

<script>
import ScrollView from '../components/ScrollView'
import Vue from 'vue'
import { Skeleton } from 'vant'

Vue.use(Skeleton)
export default {
  name: 'InformationBar',
  beforeMount () {
  },
  beforeUpdate () {
    // console.log(this.listData)
  },
  components: {
    ScrollView,
    [Skeleton.name]: Skeleton
  },
  data () {
    return {
      loading: true
    }
  },
  props: {
    listData: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  watch: {
    listData (n) {
      this.$nextTick(() => {
        this.loading = false
      })
    }
  },
  methods: {
    goChat (id, userName) {
      this.$router.push({ path: `/user/${id}`, query: { userName: userName } })
    }
  }
}
</script>

<style scoped lang="scss">
.information-bar{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  .items{
    width: 100%;
    height: 120px;
    background:#fff;
    display: flex;
    justify-content:space-between;
    align-items: center;
    i{
      width: 80px;
      height: 80px;
      background: #eee;
      background-size: cover;
      border-radius: 15px;
      margin: 0 20px 0 10px;
    }
    .data{
      flex: 1;
      height: 100%;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info{
        h2{
          font-size: 28px;
          color: #111;
          text-align:left;
          &.card{
            line-height: 120px;
          }
        }
        .msg{
          font-size: 23px;
          color: #888;
        }
      }
      .right{
        width: 100px;
        /*background: orange;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 15px;
        .time{
          width: 80px;
          margin-right: 5px;
          font-size: 24px;
          color: #666;
          text-align: center;
          /*background: #000;*/
        }
        .tips{
          display: inline-block;
          width: 30px;
          height: 30px;
          line-height: 30px;
          background: #f55454;
          border-radius: 50%;
          text-align: center;
          color: #fff;
          font-size: 20px;
          margin-top: 5px;
        }
      }
    }
  }
}
  .van-skeleton {
    width: 100%;
    height: 80px;
    margin-top: 20px;
    .van-skeleton__avatar.van-skeleton__avatar--round{
      border-radius: 5px;
    }
    .van-skeleton__content{
      padding-top: 30px;
    }
  }
</style>
