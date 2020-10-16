const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {
    signUp,
    signIn,
    userSearchAll,
    userUpData,
    userSearchOne,
    userDeleteAll,
    multers,
    cb
} = require('./api/userDataApi')

const {addFriend, searchFriendList, agreeFriend, setRemakeName} = require('./api/userFriendDataApi')
const {writeMoment, searchMoment,searchFriendMoment, like, momentMulters, momentCb} = require('./api/userMomentApi')

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

// 查找单个用户
app.post('/user/search/one',userSearchOne)

// 删除所有用户数据
app.delete('/user/delete/all',userDeleteAll)

// 用户修改用户数据
app.patch('/user/upData/:id',userUpData)

// 用户上传头像
app.patch('/avatar',multers,cb );

// 用户添加好友
app.patch('/addFriend/:id',addFriend)

// 好友验证
app.patch('/agreeFriend/:id',agreeFriend)

// 查找好友列表
app.get('/user/friend/list/:id',searchFriendList)

// 设置好友备注
app.post('/setRemakeName/:id',setRemakeName)

// 发布朋友圈
app.post('/writeMoment',writeMoment)

// 保存朋友圈图片
app.post('/momentPics/:id/:name',momentMulters,momentCb);

// 查找单个用户朋友圈
app.get('/searchMoment/:id',searchMoment)

// 查找所有好友朋友圈
app.post('/searchFriendMoment',searchFriendMoment)

// 朋友圈点赞和取消点赞的方法
app.patch('/like/:id',like)

/*
    ====================================项目API接口=============================================
    ------------------------------------------------------------------------------------------
*/

app.listen(3000,()=>{
    console.log('http://localhost:3000已启动');
})


