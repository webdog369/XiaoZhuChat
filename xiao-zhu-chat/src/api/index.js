import Network from './network'

// 用户注册
export const signUp = (data) => Network.post('/user/signUp', data)
export const signIn = (data) => Network.post('/user/signIn', data)
