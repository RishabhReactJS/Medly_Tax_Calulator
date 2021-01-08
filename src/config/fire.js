import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyAsqy_h_SeLJgjPuuOQU19dwx0OYpotic4',
  authDomain: 'medly-47903.firebaseapp.com',
  projectId: 'medly-47903',
  storageBucket: 'medly-47903.appspot.com',
  messagingSenderId: '447706113353',
  appId: '1:447706113353:web:2c302e9b43b7f37104e698',
  measurementId: 'G-PQ05YW74XD'
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
