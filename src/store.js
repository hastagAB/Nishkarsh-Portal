import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from './routes/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user')),
    admin: JSON.parse(window.localStorage.getItem('admin')),
    loading: false,
    error: null
  },
  mutations: {
    setUser (state, payload) {
      window.localStorage.setItem('user', JSON.stringify(payload));
      let currentUser = JSON.parse(window.localStorage.getItem('user'));
      state.user = currentUser;
    },
    deleteUser (state, payload) {
      state.user = payload;
    },
    setAdmin (state, payload) {
      window.localStorage.setItem('admin', JSON.stringify(payload));
      let currentAdmin = JSON.parse(window.localStorage.getItem('admin'));
      state.admin = currentAdmin;
      console.log(state.admin);
    },
    deleteAdmin (state, payload) {
      state.admin = payload;
    },
    setLoading (state, payload) {
      state.loading = payload;
    },
    setError (state, payload) {
      state.error = payload;
    },
    clearError (state) {
      state.error = null;
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true);
      commit('clearError');
      let userObj = {
        type: 'user',
        userUid: '',
        name: payload.name,
        email: payload.email,
        contact: payload.contact,
        address: payload.address
      };
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            userObj.userUid = user.user.uid;
            return firebase.firestore().collection("users").add(userObj);
          }
        )
        .then( doc =>{
          let newUser = {
            type:userObj.type,
            id: doc.id,
            uid: userObj.userUid,
            name: userObj.name,
            email: userObj.email
          }
          commit('setUser', newUser);
          commit('setLoading', false);
          router.push('/');
        })
        .catch(
          error => {
            commit('setLoading', false);
            commit('setError', error);
            console.log(error);
          }
        )
    },
    signUserIn ({commit}, payload) {

      if(localStorage.getItem("user") === null){
        
        commit('setLoading', true);
        commit('clearError');
  
        let userId = '';
        let userUid = '';
        let userEmail = '';
        let userName = '';
        let type = '';
  
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then( user => {
              commit('setLoading', false);
              return getUserDetails(user.user.uid);
            }
          )
          .then(snapshot => {
            snapshot.forEach(doc => {
              userId = doc.id;
              type = doc.data().type;
              userUid = doc.data().userUid;
              userEmail = doc.data().email;
              userName = doc.data().name;
            });
            let newUser = {
              type:type,
              id: userId,
              uid: userUid,
              name: userName,
              email: userEmail
            }
            console.log(newUser);
            commit('setUser', newUser);
            router.push('/');
          })
          .catch( error => {
              commit('setLoading', false);
              commit('setError', error);
              console.log(error);
            }
          )

      };

      
    },
    signAdminIn ({commit}, payload) {

      if(localStorage.getItem("admin") === null){
        
        commit('setLoading', true);
        commit('clearError');

        let adminId = '';
        let adminUid = '';
        let adminEmail = '';
        let adminName = '';
  
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then( admin => {
              return firebase.firestore().collection("admins").where("userUid", "==", admin.user.uid).get()
            }
          )
          .then(snapshot => {
            if(!snapshot.exists){
              console.log('no snapshot');
              firebase.auth().signOut();
              commit('deleteUser', null);
              commit('deleteAdmin', null);
              return router.push('/admin/sign-in');
            }
            snapshot.forEach(doc => {
              adminId = doc.id;
              adminUid = doc.data().userUid;
              adminEmail = doc.data().email;
              adminName = doc.data().name;
            });
            let newAdmin = {
              id: adminId,
              uid: adminUid,
              name: adminName,
              email: adminEmail
            }
            commit('setAdmin', newAdmin);
            router.push('/admin/');
          })
          .catch( error => {
              commit('setLoading', false);
              commit('setError', error);
              console.log(error);
            }
          )

      };

      
    },
    autoSignIn ({commit}, payload) {
      if(localStorage.getItem("user") === null){
        let userId = '';
        let userUid = '';
        let userEmail = '';
        let userName = '';
        let type = '';
        firebase.firestore().collection("users").where("userUid", "==", payload.uid).get()
        .then(snapshot => {
          snapshot.forEach( doc=> {
            type= doc.data().type;
            userId = doc.id;
            userUid = doc.data().userUid;
            userEmail = doc.data().email;
            userName = doc.data().name;
          });
          let newUser = {
            type: type,
            id: userId,
            uid: userUid,
            name: userName,
            email: userEmail
          }
          commit('setUser', newUser);
        }).catch(err=>{
          console.log(err);
        });
      };
    },
    logout ({commit}) {
      firebase.auth().signOut();
      window.localStorage.removeItem('user');
      commit('deleteUser', null);
      router.push('/');
    },
    logoutAdmin ({commit}) {
      firebase.auth().signOut();
      window.localStorage.removeItem('admin');
      commit('deleteAdmin', null);
    },
    clearError ({commit}) {
      commit('clearError');
    }
  },
  getters: {
    user (state) {
      return state.user;
    },
    admin (state) {
      return state.admin;
    },
    loading (state) {
      return state.loading;
    },
    error (state) {
      return state.error;
    }
  }
})


function getUserDetails(userUid){
  return firebase.firestore().collection("users").where("userUid", "==", userUid).get()
}
