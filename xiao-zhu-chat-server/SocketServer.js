const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server).sockets
const {XZLC_User_Friend_Data} = require('./user-data-db/xzlc_collections/UserFriends')
const {XZLC_User_Data} = require('./user-data-db/xzlc_collections/User')


app.get('/',(req,res) => {
    res.send({
        msg:'SocketServer http://localhost:3001 已启动'
    })
})

server.listen(3001,()=>{
    console.log('SocketServer http://localhost:3001 已启动');
})

io.on('connection',socket =>{
    socket.on('UserConnection',async msg => {
        // 用户登录成功后 将用户当前的socketI保存到数据库中
        const data = await XZLC_User_Data.findOneAndUpdate(
            {userXZLCId:msg.userXZLCId},
            {userSocketId:socket.id}
            )
        // 发送一个登录成功事件给客户端
        socket.emit('iKnow',{
            msg:`好的,服务器已经知道${msg.userName}登录了!`
        })
    })

    // 监听一个私聊事件
    socket.on('chat', async data => {
        const user =await XZLC_User_Data.findOne({
            userXZLCId: data.userId
        })
        socket.to(user.userSocketId).emit('sendTo',data)
    })



    // 用户断开连接
    socket.on('disconnect' ,data =>{
        console.log('有用户断开了');
    })
})


