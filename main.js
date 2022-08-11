import App from './App'
// import Vue from 'vue'
import store from './store/store.js'

// 导入网络请求的包
import {$http} from '@escook/request-miniprogram'
// 在uni-app中顶级对象是uni

// 请求拦截器
uni.$http = $http
// 请求的根路径https://api-ugo-web.itheima.net/
$http.baseUrl = 'https://api-ugo-web.itheima.net'

$http.beforeRequest = function(options){
  uni.showLoading({
    title:"数据加载中"
  })
}

// 响应拦截器
$http.afterRequest = function(){
  uni.hideLoading()
}

uni.$showMsg = function(title='数据请求失败',duration=1500) {
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif