const {XZLC_User_Data} = require('../user-data-db/xzlc-user-data')

const userDeleteAll = async (req,res) => {
    const data = await XZLC_User_Data.remove()
    res.send("delete ok")
}

module.exports = userDeleteAll
