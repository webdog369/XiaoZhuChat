const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/xzlc-user-data',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
// 建立数据库数据表
const Schema = new mongoose.Schema({
    userName:{ type: String },
    password:{ type: String },
    userAvatar:{ type: String },
    userSex:{ type: String },
    userXZLCId:{ type: Number },
});

const XZLC_User_Data = mongoose.model("User",Schema);

// 导出User
module.exports = { XZLC_User_Data };
