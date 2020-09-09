<template>
    <div class="mine">
      我的
    </div>
</template>

<script>
export default {
  name: 'Mine'
}
</script>

<style scoped lang="scss">
.mine{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 110px;
  background:lightblue;
  z-index: 1000;
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
