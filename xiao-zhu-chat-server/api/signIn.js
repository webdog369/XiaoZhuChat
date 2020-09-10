const {XZLC_User_Data} = require('../user-data-db/xzlc-user-data')

//登录接口
const signIn = async (req,res)=>{
    const user = await XZLC_User_Data.findOne({userName:req.body.userName});
    if (!user){
        return res.send({msg:'用户名不存在'})
    } else{
        let userPassword = user.password;
        if (userPassword !== req.body.password){
            return res.send({msg:'密码输入错误'});
        }
    }
    res.send({
        user,
        token:'login-ok',
        msg:'登录成功'
    });
}
module.exports = signIn
