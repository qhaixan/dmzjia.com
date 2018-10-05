import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueCookies from 'vue-cookies'
import firebase from 'firebase'
import VueFire from 'vuefire'
import axios from 'axios'

Vue.use(VueCookies)
Vue.use(VueFire)
Vue.prototype.$axios = axios

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
