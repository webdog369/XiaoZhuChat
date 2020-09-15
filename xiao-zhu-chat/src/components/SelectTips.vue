<template>
  <div class="sure" v-show="SelectTips[2]">
   <div class="info">
     <p>{{SelectTips[0]}}</p>
     <div class="sure-btn">
       <span @click.stop="no">取消</span>
       <span @click.stop="yes">确定</span>
     </div>
   </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SelectTips',
  computed: {
    ...mapGetters([
      'SelectTips'
    ])
  },
  methods: {
    ...mapActions([
      'setSelectTips'
    ]),
    yes () {
      this.setSelectTips(['暂无提示', true, false])
    },
    no () {
      this.setSelectTips(['暂无提示', false, false])
    }
  }
}
</script>

<style scoped lang="scss">
  .sure{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index:9999;
    background: rgba(0,0,0,.3);
    .info{
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translateX(-50%);
      width: 500px;
      height: 280px;
      background: #fff;
      p{
        width: 100%;
        height: 200px;
        line-height: 240px;
        text-align: center;
        font-size: 30px;
      }
      .sure-btn{
        width: 100%;
        height: 80px;
        display: flex;
        background: #fff;
      }
      span{
        flex: 1;
        text-align: center;
        line-height: 80px;
        font-size: 28px;
        box-sizing: border-box;
        &:nth-child(1){
          border-right: 1px solid #eee;
        }
        &:nth-child(2){
          color: #1082FF;
        }
      }
    }
  }
</style>
