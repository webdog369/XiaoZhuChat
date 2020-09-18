import Loading from './Loading'
export default {
  install: (Vue, options) => {
    // 根据组件生成一个构造函数
    const LoadingConstructor = Vue.extend(Loading)
    // 创建一个实例对象
    const LoadingInstance = new LoadingConstructor()
    // 创建一个dom元素
    const oDiv = document.createElement('div')
    // 将创建好的dom元素添加到body中
    document.body.appendChild(oDiv)
    // 将组件实例对象用$mont方法挂载到该元素上
    LoadingInstance.$mount(oDiv)
    // 设置提示框内容
    if (options && options.title !== null && options.title !== undefined) {
      LoadingInstance.Tips = options.title
    }
    // 添加显示和隐藏的全局方法
    Vue.showLoading = () => {
      LoadingInstance.isShow = true
    }
    Vue.hiddenLoading = () => {
      LoadingInstance.isShow = false
    }
    // 添加显示和隐藏的实例方法
    Vue.prototype.$showLoading = () => {
      LoadingInstance.isShow = true
    }
    Vue.prototype.$hiddenLoading = () => {
      LoadingInstance.isShow = false
    }
  }
}
