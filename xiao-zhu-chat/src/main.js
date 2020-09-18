import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import './assets/css/base.scss'
import { Skeleton } from 'vant'
// import Loading from './components/Loading'
import SelectTips from './components/SelectTips'
import Loading from '../src/plugin/Loading'
import Tips from './components/Tips'
// 使用骨架屏插件
Vue.use(Skeleton)

// loading插件
Vue.use(Loading, {
  title: '正在加载...'
})

// 全局提示框组件
Vue.component(Tips.name, Tips)
Vue.component(SelectTips.name, SelectTips)

// 解决移动端100ms~300ms点击延迟问题
fastClick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
