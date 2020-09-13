import Vue from 'vue'
import VueRouter from 'vue-router'
import Sign from '../views/Sign'
import Chat from '../views/Chat'
import ContactPerson from '../views/ContactPerson'
import Moments from '../views/Moments'
import Mine from '../views/Mine'
import ChatInterface from '../views/ChatInterface'
import UserDetail from '../components/Mine/UserDetail'
import SetUserData from '../components/Mine/SetUserData'
Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/Mine' },
  { path: '/Sign', component: Sign },
  { path: '/Chat', component: Chat, name: '消息' },
  { path: '/ContactPerson', component: ContactPerson, name: '联系人' },
  { path: '/Moments', component: Moments, name: '圈子' },
  {
    path: '/Mine',
    component: Mine,
    name: '我的',
    children: [
      { path: 'detail', component: UserDetail },
      { path: 'set', component: SetUserData }
    ]
  },
  { path: '/user/:userId', component: ChatInterface }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
