import axios from 'axios'
// import Vue from 'vue'

// 进行全局配置
axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.baseURL = 'http://192.168.43.125:3000'
axios.defaults.timeout = 3000

/* let content = 0
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  content++
  Vue.showLoading()
  return config
}, function (err) {
  Vue.hiddenLoading()
  return Promise.reject(err)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  content--
  if (content === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (err) {
  Vue.hiddenLoading()
  return Promise.reject(err)
}) */

// 封装请求方法
export default {
  // 利用Promise封装

  // get: function (path = '', data = {}) {
  //   return new Promise(function (resolve, reject) {
  //     axios.get(path, {
  //       params: data
  //     }).then(function (res) {
  //       resolve(res.data)
  //     }).catch(function (err) {
  //       reject(err)
  //     })
  //   })
  // },
  // post: function (path = '', data = {}) {
  //   return new Promise(function (resolve, reject) {
  //     axios.post(path, data).then(function (res) {
  //       resolve(res.data)
  //     }).catch(function (err) {
  //       reject(err)
  //     })
  //   })
  // }

  // 利用async/await封装
  get: async function (path = '', data = {}) {
    const res = await axios.get(path, { params: data })
    return res.data
  },
  post: async function (path = '', data = {}) {
    return await axios.post(path, data)
  },
  postFile: async function (path = '', data = {}) {
    return await axios.patch(path, data, {
    })
  },
  patch: async function (path = '', data = {}) {
    return await axios.patch(path, data)
  }
  // postFile: function (path, data) {
  //   return axios.create({
  //     baseURL: 'http://localhost:3000',
  //     timeout: 1000,
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   }).post(path, data)
  // }
}
