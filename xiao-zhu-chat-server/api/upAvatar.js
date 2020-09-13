const {XZLC_User_Data} = require('../user-data-db/xzlc-user-data')
const multer = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // const extName = file.mimetype.replace('image/', '')
        // cb(null, `avatar_${id}.${type}`);
        cb(null, `avatar_b.png`);
    }
});
let upload = multer({ storage: storage })
let aaa =  upload.single('newAvatar')
let cb  = function(req, res){
    let file = req.file;
    const url = `http://localhost:3000/images/avatar_b.png`
    console.log(req)
    // newData = {userAvatar:url}
    res.send({success: file});
}

module.exports = {aaa, cb}
