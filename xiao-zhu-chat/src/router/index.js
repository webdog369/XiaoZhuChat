import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../views/Chat'
import ContactPerson from '../views/ContactPerson'
import Moments from '../views/Moments'
import Mine from '../views/Mine'
import ChatInterface from '../views/ChatInterface'
Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/Chat' },
  { path: '/Chat', component: Chat },
  { path: '/ContactPerson', component: ContactPerson },
  { path: '/Moments', component: Moments },
  { path: '/Mine', component: Mine },
  { path: '/user/:userId', component: ChatInterface }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
