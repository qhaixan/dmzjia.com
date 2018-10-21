import Vue from 'vue'
import Vuex from 'vuex'

import actions from './store/actions';
import getters from './store/getters';
import mutations from './store/mutations';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMobile: true,
    common: {
      title: 'DMZ家',
      secondaryColor: '#d10000',
      bg:'black',
      avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxC8tK9WH3CbaNFjiCcOkdiJlCyTL9IObOMJN63ECX_R-DmN8Jhw'
    },
    session: {
      uid: null,
      name: null,
      role: 0,
      avatar: null,
      randomKey: null
    },
    action:{
      key:null
    },
    controlpanel: {
      menu: {
        drawer: null
      }
    },
    public: {
      overlay: {
        show: false,
        content: null,
        width: null,
        action: null
      },
      geo:{
        'geoplugin_request':null,//ip
        'geoplugin_city':null,
        'geoplugin_region':null,
        'geoplugin_countryName':null,
        'geoplugin_continentName':null,
        'geoplugin_latitude':null,
        'geoplugin_longitude':null
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
