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
import Tips from './components/Tips'
import SelectTips from './components/SelectTips'
export default {
  components: {
    TabBar,
    NavBar,
    Tips,
    SelectTips
  }
}
</script>
<style lang="scss">
</style>
