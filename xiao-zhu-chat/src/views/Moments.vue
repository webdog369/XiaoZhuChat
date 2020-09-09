<template>
      <div class="moments">
        我是朋友圈
      </div>
</template>

<script>
export default {
  name: 'Moments'
}
</script>

<style scoped lang="scss">
.moments {
  position: fixed;
  left: 0;
  right: 0;
  top: 80px;
  bottom: 110px;
  background:lightblue;
}
/*.v-leave{
  transform: translateX(0%);
  opacity: 1;
}
.v-leave-active{
  transition: all .3s ease-in-out;
}
.v-leave-to{
  transform: translateX(-100%);
  opacity: 0;
}*/
</style>
