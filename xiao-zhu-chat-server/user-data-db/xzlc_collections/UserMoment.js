const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/xzlc-user-data',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
// 建立数据库数据表
const Schema = new mongoose.Schema({
        userId:{type:Number},
        content:{type:String},
        pics:{type:Array},
        time:{type:String},
        likeUser:{type:Array}
});

const XZLC_User_Moment_Data = mongoose.model("UserMoment",Schema);

// 导出User
module.exports = { XZLC_User_Moment_Data };
