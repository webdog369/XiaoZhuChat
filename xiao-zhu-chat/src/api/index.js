import Network from './network'

// 用户注册
export const signUp = (data) => Network.post('/user/signUp', data)
// 用户登录
export const signIn = (data) => Network.post('/user/signIn', data)
// 用户修改数据
export const userUpData = (id, data) => Network.patch(`/user/upData/${id}`, data)
// 查找单个用户
export const userSearchOne = (data) => Network.post('/user/search/one', data)
// 用户上传头像
export const userAvatarUpData = (data, id) => Network.postFile(`/avatar?id=${id}`, data)
// 用户添加好友
export const userAddFriend = (id, data) => Network.patch(`/addFriend/${id}`, data)
// 好友验证
export const agreeFriend = (id, data) => Network.patch(`/agreeFriend/${id}`, data)

export const setRemakeName = (id, data) => Network.post(`/setRemakeName/${id}`, data)
// 查找用户好友列表
export const userFriendList = (id) => Network.get(`/user/friend/list/${id}`)
// 发布朋友圈
export const userWriteMoment = (data) => Network.post('/writeMoment', data)
// 查询某人朋友圈
export const userSearchMoment = (id) => Network.get(`/searchMoment/${id}`)
// 查询所有好友朋友圈
export const searchFriendMoment = (data) => Network.post('/searchFriendMoment', data)
// 点赞朋友圈
export const userLike = (id, data) => Network.patch(`/like/${id}`, data)
