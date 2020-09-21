// 获取指定范围随机数
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
}

// 格式化时间
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 格式化数字
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 存储本地缓存
export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 读取本地缓存
export const getLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}
