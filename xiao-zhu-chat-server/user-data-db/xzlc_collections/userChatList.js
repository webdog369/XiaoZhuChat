const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/xzlc-user-data',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

// 建立数据库数据表
const Schema = new mongoose.Schema({
    userXZLCId:{ type: Number },
    chatLists:[
        {
        friendId:{type:Number},
        chats:{type:Array}
        }
    ]
});

const XZLC_User_Chat_List = mongoose.model("UserChatList",Schema);

// 导出User
module.exports = { XZLC_User_Chat_List };
