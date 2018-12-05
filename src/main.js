import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DateFilter from './filters/date'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import AppAlert from './components/shared/Alert'
import Nl2br from 'vue-nl2br'

Vue.use(Vuetify)
Vue.filter('date', DateFilter)
Vue.component('app-alert', AppAlert)
Vue.component('nl2br', Nl2br)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
  	firebase.initializeApp({
  		apiKey: '',
	    authDomain: '',
	    databaseURL: '',
	    projectId: '',
	    storageBucket: ''
  	})
    if(firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('loadRegisteredMeetups')
      }
    }))
    this.$store.dispatch('loadedMeetups')
  }
})
