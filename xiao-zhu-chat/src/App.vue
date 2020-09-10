<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
    <TabBar></TabBar>
    <Tips></Tips>
  </div>
</template>
<script>
import TabBar from './components/TabBar'
import NavBar from './components/NavBar'
import Tips from './components/Tips'
export default {
  components: {
    TabBar,
    NavBar,
    Tips
  }
}
</script>
<style lang="scss">
</style>
