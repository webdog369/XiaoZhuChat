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

const {addFriend,searchFriendList} = require('./api/userFriendDataApi')

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

app.post('/user/search/one',userSearchOne)

// 删除所有用户数据
app.delete('/user/delete/all',userDeleteAll)

// 用户修改用户数据
app.patch('/user/upData/:id',userUpData)

// 用户上传头像
app.patch('/avatar',multers,cb );

// 用户添加好友
app.patch('/addFriend/:id',addFriend)

// 查找好友列表
app.get('/user/friend/list/:id',searchFriendList)


// 废弃代码
/*let upload = multer({ dest: './public/images/' });

单图上传
app.post('/upload', upload.single('value'), function(req, res, next){
    res.send({
        msg:req.file.path
    });
});
app.post('/imageLoad', async (req,res)=>{
    const rs = fs.createReadStream(req.body.newAvatar)
    const ws = fs.createWriteStream('./public/images/')
    rs.on('data',data=>{
        console.log('读取到的数据是:', data)
    });
    rs.on('end',data=>{
        console.log('读取流结束,关闭了写入流');
        ws.end()
    })
    res.send({
        msg:'ok'
    })
})*/

/*
    ====================================项目API接口=============================================
    ------------------------------------------------------------------------------------------
*/

app.listen(3000,()=>{
    console.log('http://localhost:3000已启动');
})


