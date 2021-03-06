/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import './quasar'
import Vuelidate from 'vuelidate'
import vMediaQuery from 'v-media-query'

import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '@/config/firebase'
// firebase.initializeApp(firebaseConfig)  MANERA ORIGINAL
const firebaseApp = firebase.initializeApp(firebaseConfig)
// export const db = firebase.firestore() MANERA ORIGINAL
export const db = firebaseApp.firestore()

//Importando la traduccion de nuestro proyecto
import i18n from './config/i18n.js'

//Importando Vuex
import store from '@/store'

Vue.use(Vuelidate)
Vue.use(vMediaQuery)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  mounted() {
      firebase.auth().onAuthStateChanged(user => {
          // let uidUser = data.user.uid
          if (user) {
            //   console.log("funciona");
              db.collection("users").doc(user.uid).onSnapshot( snapshot => {
                  store.commit('setUser', user)

                  if ( snapshot.exists ) {
                    store.commit('setRole', snapshot.data().role)
                  } 
                  store.commit('setLoaded', true)
              } )
          } else {
              store.commit('setLoaded', true)
          }
      })
  },

  render: h => h(App)
}).$mount('#app')
