const {XZLC_User_Friend_Data} = require('../user-data-db/xzlc_collections/UserFriends')
const {XZLC_User_Data} = require('../user-data-db/xzlc_collections/User')

const addFriend = async (req,res) => {
    const myId = req.params.id
    const friendId = req.body.friendId
    // 1.查询用户
    const friend = await XZLC_User_Data.findOne({userXZLCId:friendId})
    // 查找用户是否有好友列表
    const user = await XZLC_User_Friend_Data.findOne({userXZLCId:myId})
    // 如果没有好友列表 则给当前用户创建一个好友列表
    if (user === null){
        const data = await XZLC_User_Friend_Data.create({
            userXZLCId:myId,
            userFriend:[{
                userId:friend.userXZLCId
            }]
        })
        res.send({
            msg:`恭喜你添加了第一个好友,ta叫${friend.userName}!`,
        })
    }
    else {
        // 查找用户是否已经添加过当前好友了
        for (let key of user.userFriend){
            if ( key.userId == friend.userXZLCId){
                res.send({msg:`${friend.userName}已经是您的好友了,请勿重复添加!`})
                return
            }
        }
        // 若该好友不是用户的好友 则把好友id加入到用户好友数组中
        const newFriendList = user.userFriend
        // console.log(newFriendList);
        newFriendList.push({
            userId:friend.userXZLCId
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
            msg: `您已将${friend.userName}成功添加为好友!`,
            newList:newList
        })
    }
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
            newList.push(key.userId)
        }
        res.send({
            result:newList
        })
    }
}

module.exports = {addFriend, searchFriendList}
