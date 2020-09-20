import io from 'weapp.socket.io'
const socket = io('http://localhost:3001')
// 注册一个登录事件 将用户信息发送给服务器
export const UserConnection = (userData) => {
  socket.emit('UserConnection', userData)
}
// 接收一个服务器对登录事件的反馈
export const iKnow = () => {
  socket.on('iKnow', msg => {
    console.log(msg)
  })
}

// 发射一个私人聊天事件
export const chat = (id, data) => {
  socket.emit('chat', {
    userId: id,
    msg: data
  })
}

export const MsgResult = () => {
  socket.on('sendTo', data => {
    console.log(data)
  })
}