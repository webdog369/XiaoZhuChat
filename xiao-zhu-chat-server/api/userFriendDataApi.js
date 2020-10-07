const {XZLC_User_Friend_Data} = require('../user-data-db/xzlc_collections/UserFriends')
const {XZLC_User_Data} = require('../user-data-db/xzlc_collections/User')

const addFriend = async (req,res) => {
    const myId = parseInt(req.params.id)
    const friendId = req.body.friendId
    console.log(myId, friendId);
    try {
        await appendFriend(res, myId, friendId, true)
        await appendFriend(res, friendId, myId, false)
    }catch (e) {}

}
const agreeFriend = async (req, res) => {
    const myId = parseInt(req.params.id)
    const friendId = req.body.friendId
    const result = req.body.result
    console.log(myId, friendId);
    try{
        await agree(res,myId,friendId,result)
        await agree(res,friendId,myId,result)
    }catch (e) {}

}
const searchFriendList = async (req,res) =>{
    const List = await XZLC_User_Friend_Data.findOne({
        userXZLCId:req.params.id
    })
    if (List === null){
        res.send({result:'暂时还没有好友,赶快去添加好友吧~'})
    }else {
        let newList = []
        for (let key of List.userFriend){
            const items = {
                userId:key.userId,
                status:key.status,
                remakeName:key.remakeName,
                initiative:key.initiative
            }
            newList.push(items)
        }
        res.send({
            result:newList
        })
    }
}


// 添加好友的方法
async function appendFriend  (res,myId,friendId,initiative){
    // 1.查询用户
    const friend = await XZLC_User_Data.findOne({userXZLCId:friendId})
    // 查找用户是否有好友列表
    const user = await XZLC_User_Friend_Data.findOne({userXZLCId:myId})
    console.log(user,'???')
    // 如果没有好友列表 则给当前用户创建一个好友列表
    if (user === null){
        // 给自己创建一份好友
        const data = await XZLC_User_Friend_Data.create({
            userXZLCId:myId,
            userFriend:[{
                userId:friend.userXZLCId,
                status:0,
                initiative:initiative
            }]
        })
        res.send({
            // msg:`恭喜你添加了第一个好友,ta叫${friend.userName}!`
            msg:'好友请求发送成功!'
        })
    }
    else {
        console.log(user.userFriend ,'===');
        // 查找用户是否已经添加过当前好友了
        for (let key of user.userFriend){
            console.log(key);
            if ( key.userId === friend.userXZLCId && key.status === 0){
                res.send({msg:'已经发送过好友请求了,等待验证中!'})
                return
            }
            else if ( key.userId === friend.userXZLCId && key.status === 1){
                res.send({msg:`${friend.userName}已经是您的好友了,请勿重复添加!`})
                return
            }else if ( key.userId === friend.userXZLCId && key.status === 2){
                key.status = 0
                const again = await XZLC_User_Friend_Data.findOneAndUpdate({
                    userXZLCId:myId
                },{
                    userFriend:user.userFriend
                })
                res.send({msg:'监测到对方曾经拒绝过你的好友请求,现已重新发送请求'})
                return
            }
        }
        // 若该好友不是用户的好友 则把好友id加入到用户好友数组中
        const newFriendList = user.userFriend
        // console.log(newFriendList);
        newFriendList.push({
            userId:friend.userXZLCId,
            status:0,
            initiative:initiative
        })
        // console.log(newFriendList);
        // 找到当前用户 并更新好友列表
        const oldList = await XZLC_User_Friend_Data.findOneAndUpdate({
            userXZLCId:myId
        },{
            userFriend: newFriendList
        })
        // 查询到更新后的好友列表返回给用户
        const newList = await XZLC_User_Friend_Data.find({
            userXZLCId:myId
        })
        res.send({
            // msg: `您已将${friend.userName}成功添加为好友!`,
            msg: '好友请求发送成功!',
            newList:newList
        })
    }
}

// 好友验证的方法
async function agree (res,myId,friendId,result){
    const myData = await XZLC_User_Friend_Data.findOne({
        userXZLCId:myId
    })
    for (let key of myData.userFriend){
        if (key.userId === friendId){
            if (result){
                key.status = 1
            }else {
                key.status = 2
            }

        }
    }
    const data1 = await XZLC_User_Friend_Data.findOneAndUpdate({
        userXZLCId:myId
    },{
        userFriend:myData.userFriend
    })
    res.send({
        msg:'修改成功'
    })
}
module.exports = {addFriend, searchFriendList, agreeFriend}
