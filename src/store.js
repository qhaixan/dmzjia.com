import Vue from 'vue'
import Vuex from 'vuex'

import actions from './store/actions';
import getters from './store/getters';
import mutations from './store/mutations';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    controlpanel: {
      menu: {
        drawer: null
      }
    },
    public: {
      overlay: {
        show: false,
        content: ''
      }
    },
    test: {
      count:0,
      employee:[
        { id: 1, name: 'Alex' },
        { id: 2, name: 'Betty'},
        { id: 3, name: 'Charles' },
        { id: 4, name: 'Daniel' }
      ]
    }
  },
  actions,
  getters,
  mutations
})
