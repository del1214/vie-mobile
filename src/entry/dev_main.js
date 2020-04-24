import Vue from 'vue'
import App from '../App'
import router from '../router'
Vue.config.devtools = true
Vue.config.productionTip = false
console.log('dev')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
