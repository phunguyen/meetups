import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
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
  		apiKey: 'AIzaSyCXsMyzWcBFDq7zKzj__hFATiN9hcwuACY',
	    authDomain: 'dev-meetups-6a620.firebaseapp.com',
	    databaseURL: 'https://dev-meetups-6a620.firebaseio.com',
	    projectId: 'dev-meetups-6a620',
	    storageBucket: 'gs://dev-meetups-6a620.appspot.com'
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
