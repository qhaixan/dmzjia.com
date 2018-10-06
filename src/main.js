import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import firebase from 'firebase'
import VueFire from 'vuefire'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueFire)
Vue.use(VueLocalStorage, {
  name: 'localStorage',
  bind: true //created computed members from your variable declarations
})
Vue.prototype.$axios = axios

Vue.config.productionTip = false


new Vue({
  localStorage: {
    RNnryrIfpw: {//uid
      type: String,
      default: null
    },
    W3pWa9TD8p: {//role
      type: Number,
      default: 0
    },
    LhDJ6aj8AJ: {//name
      type: String,
      default: null
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
