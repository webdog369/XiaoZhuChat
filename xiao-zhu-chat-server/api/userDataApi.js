const {XZLC_User_Data} = require('../user-data-db/xzlc-user-data')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
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

//登录接口
const signIn = async (req, res)=>{
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

// 查找所有用户接口
const userSearchAll = async (req,res) => {
    const data = await XZLC_User_Data.find()
    res.send(data)
}

// 用户修改个人数据接口
const userUpData = async (req,res) => {
    const id  = req.params.id
    const key = req.body.key
    const value = req.body.value
    const type = req.body.type
    // 判断用户需要修改的是什么字段
    let newData = {}
    switch (key) {
        case 'userName':
            newData = {userName:value}
            break
        case 'userSex' :
            newData = {userSex:value}
            break
        case 'userAvatar':
            break
    }
    const data = await XZLC_User_Data.findOneAndUpdate({
        userXZLCId:id
    },newData)
    res.send({msg:'修改成功',
            result:data})
}
// 删除所有用户接口
const userDeleteAll = async (req,res) => {
    const data = await XZLC_User_Data.remove()
    res.send("delete ok")
}

module.exports = {signUp, signIn, userSearchAll,userUpData, userDeleteAll}
