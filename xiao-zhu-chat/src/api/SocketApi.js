import io from 'weapp.socket.io'
import store from '../store'
const socket = io('http://localhost:3001')
// 注册一个登录事件 将用户信息发送给服务器
export const UserConnection = (userData) => {
  socket.emit('UserConnection', userData)
}
// 接收一个服务器对登录事件的反馈
export const iKnow = () => {
  socket.on('iKnow', msg => {
    store.commit('SET_CHAT_LIST', msg.chatLists)
  })
}

// 发射一个私人聊天事件
export const chat = (id, data) => {
  socket.emit('chat', {
    userId: id,
    msg: data
  })
}

// 监听好友发送来的信息
export const MsgResult = () => {
  socket.on('sendTo', data => {
    let num = store.getters.newMsgNum
    store.commit('SET_CHAT_LIST', data)
    store.commit('SET_NEW_MSG_NUM', num++)
  })
}

// 发射一个好友添加事件
export const appendFriend = (id, msg) => {
  socket.emit('appendFriend', {
    friendId: id,
    msg: msg
  })
}

// 监听好友请求
export const friendRequest = () => {
  socket.on('friendRequest', data => {
    store.commit('SET_NEW_FRIEND_TIPS', true)
  })
}
