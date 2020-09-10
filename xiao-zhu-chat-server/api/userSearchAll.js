const {XZLC_User_Data} = require('../user-data-db/xzlc-user-data')

const userSearchAll = async (req,res) => {
    const data = await XZLC_User_Data.find()
    res.send(data)
}
module.exports = userSearchAll
