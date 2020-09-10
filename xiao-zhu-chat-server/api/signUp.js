const {XZLC_User_Data} = require('../user-data-db/xzlc-user-data')
// 注册接口
const signUp = async (req,res)=>{
        // 在数据库中查找是否存在当前用户名
        const SearchUser = await XZLC_User_Data.findOne({userName:req.body.userName});
        // 如果存在 则返回提示信息
        if (SearchUser) return res.send({msg:'用户名已被注册'});
        // 判断用户所选性别 设置默认头像
        let userAvatar  = 'http://localhost:3000/images/avatar_boy.png'
        if (req.body.userSex === 'girl'){
            userAvatar  = 'http://localhost:3000/images/avatar_girl.png'
        }
        // 设定用户id
        const dbLength = await XZLC_User_Data.find()
        const userXZLCId = 1000 + dbLength.length
        // 将用户的数据整理后添加到数据库中
        const user = await XZLC_User_Data.create({
            userName:req.body.userName,
            password:req.body.password,
            userAvatar:userAvatar,
            userXZLCId:userXZLCId
        });
        res.send({msg:'注册成功!', data:user});
    }

module.exports = signUp

