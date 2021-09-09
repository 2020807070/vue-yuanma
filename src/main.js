import Vue from 'vue'

import App from './App.vue'
import router from './krouter'
import store from './kstore'

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log('app', app)
