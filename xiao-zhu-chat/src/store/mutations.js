import {
  SET_TIPS,
  SET_CURRENT_USER,
  SET_SELECT_TIPS,
  SET_CHAT_LIST
} from './mutations-type'
import { userSearchOne } from '../api/index'
export default {
  [SET_TIPS] (state, payload) {
    state.Tips = [payload, true]
    setTimeout(() => {
      state.Tips = ['', false]
    }, 1000)
  },
  [SET_CURRENT_USER] (state, payload) {
    state.currentUser = payload
  },
  [SET_SELECT_TIPS] (state, payload) {
    state.SelectTips = payload
  },
  [SET_CHAT_LIST] (state, payload) {
    console.log(!state.ChatList.length && payload.length !== undefined)
    console.log(typeof payload)
    console.log(payload)
    let flag = false
    let index = 0
    // 调用该方法时若ChatList为空且payload不为空就将用户所有聊天记录存入ChatList
    if (!state.ChatList.length && payload.length !== undefined) {
      console.log('登录后初次导入聊天记录')
      state.ChatList = payload
    } else if (state.ChatList.length) {
      // 若ChtList不为空则开始查找是否该好友的聊天记录为空
      // 如果好友存在 则给好友更新聊天数据
      state.ChatList.map((v, i) => {
        if (v.friendId === payload.friendId) {
          flag = true
          index = i
        }
      })
      if (flag) {
        userSearchOne({
          friendId: payload.friendId
        }).then(data => {
          payload.tag = 'FRIEND_MSG'
          payload.userAvatar = data.data[0].userAvatar
          state.ChatList[index].chats.push(payload)
        })
      } else {
        console.log('我有和其他好友的聊天记录,但是是与该好友的第一次聊天')
        // 如果好友不存在(说明是第一次聊天)则给好友新建一个聊天数据
        state.ChatList.push({
          friendId: payload.friendId,
          chats: [payload]
        })
      }
    } else {
      console.log('我没有任何聊天记录,这是与第一个好友的第一次聊天')
      state.ChatList.push({
        friendId: payload.friendId,
        chats: [payload]
      })
    }
  }
}
