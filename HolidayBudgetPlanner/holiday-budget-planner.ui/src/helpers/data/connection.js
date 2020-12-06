import firebase from 'firebase';
import apiKeys from '../apiKeys.json';

const firebaseApp = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
};

export default firebaseApp;
