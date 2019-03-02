import firebase from 'firebase'

export default (to, from, next) => {
  if (firebase.auth().currentUser) {
    next();
  } else {
    next('/sign-in');
  }
}