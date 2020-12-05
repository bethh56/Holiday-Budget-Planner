/* eslint-disable implicit-arrow-linebreak */
import firebase from 'firebase';
import axios from 'axios';
import { baseUrl } from './constants.json';

// interceptors work by changing the outbound request before the xhr is sent
// or by changing the response before it's returned to our .then() method.
axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');

  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, (err) => Promise.reject(err));

const registerUser = (user) =>
  // sub out whatever auth method firebase provides that you want to use.
  firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((cred) => {
    console.error('logincred', cred.user);
    // get email from firebase
    console.error('register', user);
    const userInfo = {
      uid: firebase.auth().currentUser.uid,
      email: user.email,
      password: user.password,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    // get token from firebase
    cred.user.getIdToken()
      // save the token to the session storage
      .then((token) => sessionStorage.setItem('token', token))
      // save the user to the the api
      .then(() => axios.post(`${baseUrl}/users`, userInfo));
    console.error('register', user);
  });
const loginUser = (user) =>
  // sub out whatever auth method firebase provides that you want to use.
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((cred) => {
    // get token from firebase
    cred.user.getIdToken()
    // save the token to the session storage
      .then((token) => sessionStorage.setItem('token', token));
  });
const logoutUser = () => {
  sessionStorage.removeItem('token');
  return firebase.auth().signOut();
};

const getUid = () => {
  const token = sessionStorage.getItem('token');
  let uid = '';

  if (token != null) {
    uid = firebase.auth().currentUser.uid;
  }
  return uid;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUid,
  loginUser,
  logoutUser,
  registerUser,
};
