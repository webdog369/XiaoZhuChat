const {XZLC_User_Moment_Data} = require('../user-data-db/xzlc_collections/UserMoment')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

// 发布朋友圈接口
const  writeMoment = async (req,res) => {
  const data = await XZLC_User_Moment_Data.create({
      userId:req.body.userXZLCId,
      content:req.body.content,
      pics:req.body.pics,
      time:req.body.time,
      likeUser:[],
      competence:req.body.competence
  })
    res.send({
        msg:'发布成功'
    })
}

// 查找单个用户朋友圈
const searchMoment = async (req, res) => {
  const data = await XZLC_User_Moment_Data.find({
      userId:req.params.id
  })
    res.send({
        result:data
    })
}

// 查找某位用户所有好友的朋友圈
const searchFriendMoment = async (req, res) => {
    const data = await XZLC_User_Moment_Data.find({
        userId:{$in:req.body.friendIdList}
    })
    res.send({
        result:data
    })
}

// 朋友圈点赞和取消点赞的方法
const like = async (req, res) => {
    let doWhat = ''
    let flag = true
    // 查找当前用户是否点赞过该条说说
    const userLike = await XZLC_User_Moment_Data.findOne({
        _id:req.params.id
    })
    // 遍历当前这条朋友圈的点赞列表
    if (userLike.likeUser.length){
        userLike.likeUser.map((v,i) => {
            if (v === req.body.userXZLCId){
                // 如果找到了 就代表点赞过了 现在要执行取消点赞操作
                userLike.likeUser.splice(i,1)
                doWhat = '已取消点赞'
                flag = false
            }
        })
        // 若执行过取消点赞操作 则不需要执行点赞操作
        if (flag){
            console.log('我运行了几次?');
            // 若没找到 说明要执行点赞操作
            userLike.likeUser.unshift(req.body.userXZLCId)
            doWhat = '点赞成功'
        }
        // 若点赞列表是空的 则直接点赞
    }else {
        userLike.likeUser = [req.body.userXZLCId]
        doWhat = '点赞成功'
    }


    // 把更新后的点赞列表同步到数据库
    const data = await XZLC_User_Moment_Data.findOneAndUpdate({
        _id:req.params.id
    },{
        likeUser:userLike.likeUser
    })

    res.send({
        msg:doWhat
    })
}

// 保存朋友圈的图片
// 1.详细配置文件写入目录以及文件名
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 解析相对路径查看是否存在该用户的文件夹 若不存在 就创建一个 若存在就将图片存储到文件夹下
        const pathUrl = path.resolve(`./public/moment_images/${req.params.id}`)
        fs.access(pathUrl,haveDir =>{
            if (haveDir){
               fs.mkdir(pathUrl,data => {
                   cb(null, pathUrl);
               })
            }else{
                cb(null, pathUrl);
            }
        })
    },
    filename: function (req, file, cb) {
        const extName = file.mimetype.replace('image/', '')
        cb(null, `${req.params.name}.${extName}`);
    }
});

// 2.将配置好的信息创给multer
let upload = multer({ storage: storage })

// 3.调用multer的single方法
let momentMulters =  upload.fields([{name:'momentImages',maxCount:9}])

// 4.处理返回数据
let momentCb  = async function(req, res){
    res.send({
        msg:'朋友圈图片存储成功'
    });
}

module.exports = {writeMoment, searchMoment, searchFriendMoment, like, momentMulters, momentCb}
