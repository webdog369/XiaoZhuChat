const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server).sockets
const {XZLC_User_Friend_Data} = require('./user-data-db/xzlc_collections/UserFriends')
const {XZLC_User_Data} = require('./user-data-db/xzlc_collections/User')
const {XZLC_User_Chat_List} = require('./user-data-db/xzlc_collections/userChatList')


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
        console.log(data);
        // 根据朋友的id 找到朋友的最新数据 取出其在线时候的socketId
        const friendData = await XZLC_User_Data.findOne({
            userXZLCId: data.userId,
        })
        // 将用户传来的数据进行拆分打包
        const msg = {
            friendId:data.msg.myId,
            friendMsg:data.msg.msg,
            time:data.msg.time
        }
        // 私发给指定用户
        socket.to(friendData.userSocketId).emit('sendTo',msg)

        // 将本条聊天数据存储到用户的数据库中
        const myData = await XZLC_User_Chat_List.findOne({
            userXZLCId:data.msg.myId
        })
        // 如果不存在 说明该用户还没有任何聊天记录 则需要创建一条与该好友的聊天记录
        if (myData === null){
            const newData = XZLC_User_Chat_List.create({
                userXZLCId:data.msg.myId,
                chatLists:[
                    {
                        friendId:data.userId,
                        chats:[msg]
                    }
                ]
            })
        }else {
            // 若找到了该好友 则需要更新聊天数据
            let oldObj = {}
            // 遍历找出当前好友的所有聊天数据 存储到oldObj中
            // 此处需要新建与新好友的聊天记录 休息吧
            for (let key of myData.chatLists){
                if (key.friendId == data.userId){
                    console.log(key);
                    oldObj = key
                    break
                }
            }
            // console.log(oldObj);
            /*    // 给oldObj添加一条新数据
               oldObj.chats.unshift(msg)
             // console.log(oldObj);
                // 再次遍历找出当前用户的所有聊天记录 把与该好友的聊天记录更新替换
                myData.chatLists.map((value,index)=>{
                    if (value.friendId == oldObj.friendId){
                        console.log(myData.chatLists[index])
                        // myData.chatLists[index] = oldObj
                    }
                })
                // 调用数据库更新数据
                const pushData = await XZLC_User_Chat_List.findOneAndUpdate({
                    userXZLCId:data.msg.myId
                },myData)*/
        }
    })



    // 用户断开连接
    socket.on('disconnect' ,data =>{
        console.log('有用户断开了');
    })
})


