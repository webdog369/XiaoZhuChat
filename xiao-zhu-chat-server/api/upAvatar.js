const {XZLC_User_Data} = require('../user-data-db/xzlc-user-data')
// 引入文件上传模块
const multer = require('multer')

//详细配置文件写入目录以及文件名
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/userAvatar/');
    },
    filename: function (req, file, cb) {
        const extName = file.mimetype.replace('image/', '')
        // cb(null, `avatar_${id}.${type}`);
        cb(null, `avatar_${req.query.id}.${extName}`);
    }
});

// 将配置好的信息创给multer
let upload = multer({ storage: storage })

// 调用multer的single方法
let multers =  upload.single('newAvatar')

// 处理返回数据
let cb  = async function(req, res){
    const url = `http://localhost:3000/userAvatar/${req.file.filename}`
    const user = await XZLC_User_Data.findOneAndUpdate({
        userXZLCId:req.query.id
    },{
        userAvatar:url
    })
    res.send({
        success: user
    });
}

module.exports = {multers, cb}
