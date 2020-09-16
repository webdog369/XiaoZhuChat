const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/xzlc-user-data',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
// 建立数据库数据表
const Schema = new mongoose.Schema({
    userXZLCId:{ type: Number },
    userFriend:[{
        userId:{type:Number}
    }]
});

const XZLC_User_Friend_Data = mongoose.model("UserFriend",Schema);

// 导出User
module.exports = { XZLC_User_Friend_Data };
