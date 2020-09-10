const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const signUp = require('./api/signUp')
const signIn = require('./api/signIn')
const userSearchAll = require('./api/userSearchAll')
const userDeleteAll = require('./api/userDeleteAll')

// 创建express实例
const app = express()

// 解决跨域问题
app.use(cors())

// 设置静态资源目录
app.use('/',express.static("public"))

// 使用body-Parser中间件 允许处理json数据
app.use(bodyParser.json());


/*
    ------------------------------------------------------------------------------------------
    ====================================项目API接口=============================================
*/

// 注册接口
app.post('/user/signUp',signUp)

// 登录接口
app.post('/user/SignIn',signIn)

// 查询所有用户数据
app.get('/user/search/all',userSearchAll)

// 删除所有用户数据
app.delete('/user/delete/all',userDeleteAll)






/*
    ====================================项目API接口=============================================
    ------------------------------------------------------------------------------------------
*/




app.listen(3000,()=>{
    console.log('http://localhost:3000已启动');
})


