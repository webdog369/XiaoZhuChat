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
    console.log(payload)
    console.log(!state.ChatList.length && payload.length !== undefined)
    // 调用该方法时若ChatList为空且payload不为空就将用户所有聊天记录存入ChatList
    if (!state.ChatList.length && payload.length !== undefined) {
      state.ChatList = payload
    } else if (state.ChatList.length) {
      // 若ChtList不为空则开始查找是否该好友的聊天记录为空
      for (const key of state.ChatList) {
        // 如果好友存在 则给好友更新聊天数据
        if (key.friendId === payload.friendId) {
          userSearchOne({
            friendId: payload.friendId
          }).then(data => {
            payload.tag = 'FRIEND_MSG'
            payload.userAvatar = data.data[0].userAvatar
            key.chats.push(payload)
          })
        } else {
          // 如果好友不存在(说明是第一次聊天)则给好友新建一个聊天数据
          state.ChatList.push({
            friendId: payload.friendId,
            chats: [payload]
          })
        }
      }
    } else {
      state.ChatList.push({
        friendId: payload.friendId,
        chats: [payload]
      })
    }
  }
}
