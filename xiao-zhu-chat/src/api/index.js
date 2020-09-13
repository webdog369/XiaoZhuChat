import Network from './network'

// 用户注册
export const signUp = (data) => Network.post('/user/signUp', data)
// 用户登录
export const signIn = (data) => Network.post('/user/signIn', data)
// 用户修改数据
export const userUpData = (id, data) => Network.patch(`/user/upData/${id}`, data)

export const userAvatarUpData = (data) => Network.postFile(`/avatar?newAvatar=${data}`)
