<template>
  <div id="app">
    <NavBar></NavBar>
        <router-view></router-view>
    <TabBar></TabBar>
    <Tips></Tips>
    <SelectTips></SelectTips>
  </div>
</template>
<script>
import TabBar from './components/TabBar'
import NavBar from './components/NavBar'
export default {
  components: {
    TabBar,
    NavBar
  }
}
</script>
<style lang="scss">
</style>
