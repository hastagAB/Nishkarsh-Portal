import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import Layout from './components/Layout.vue';
import router from './routes/router';
import store from './store';
import firebase from 'firebase';

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyA6NAL7hUMxdJ-QkTpwnPqgwaMn1TpO8eQ",
  authDomain: "nisharksh2-8dd85.firebaseapp.com",
  databaseURL: "https://nisharksh2-8dd85.firebaseio.com",
  projectId: "nisharksh2-8dd85",
  storageBucket: "nisharksh2-8dd85.appspot.com",
};

const options = {
  color: '#007bff',
  failedColor: '#874b4b',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

firebase.initializeApp(config);

Vue.use(VueProgressBar, options)

// new Vue({
//   router,
//   store,
//   render: h => h(Layout),
//   created() {
//     firebase.initializeApp(config);
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.$store.dispatch('autoSignIn', user)
//       }
//     });
//   }
// }).$mount('#app')


let app;

firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    if(store.getters.user == ""){
      console.log('no user')
      store.dispatch('autoSignIn', user);
    }
  }

  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(Layout),
      created() {
        
      }
    }).$mount('#app')
  }
  
});
