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
        // 把聊天数据存储到我的数据库中
        await SaveChatList(data.msg.myId, data.userId,msg)
        // 在好友的数据库中存同样一份
        await SaveChatList(data.userId,data.msg.myId,msg)
    })



    // 用户断开连接
    socket.on('disconnect' ,data =>{
        console.log('有用户断开了');
    })
})

// 存储聊天数据的方法
 const SaveChatList = async (myId,friendId,msg) => {
            // 将本条聊天数据存储到用户的数据库中
            const myData = await XZLC_User_Chat_List.findOne({
                userXZLCId:myId
            })
            // 如果不存在 说明该用户还没有任何聊天记录 则需要创建一条与该好友的聊天记录
            if (myData === null){
                const newData = XZLC_User_Chat_List.create({
                    userXZLCId:myId,
                    chatLists:[
                        {
                            friendId:friendId,
                            chats:[msg]
                        }
                    ]
                })
            }else {
                // 若找到了用户的聊天数据 再找与当前好友是否有聊天数据
                for (let key of myData.chatLists){
                    // 若找到了 此处需要新建与新好友的聊天记录
                    if (key.friendId == friendId){
                        key.chats.unshift(msg)
                    }else {
                        // 若没找到 就新建一条数据
                        myData.chatLists.unshift({
                            friendId:friendId,
                            chats:[msg]
                        })
                        break
                    }
                }
                // 调用数据库更新数据
                const pushData = await XZLC_User_Chat_List.findOneAndUpdate({
                    userXZLCId:myId
                },myData)
            }
        }


