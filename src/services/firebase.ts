import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBZMG6gePLXPTVcwLwEnrl1QAxCBFfVgQA",
  authDomain: "letmeask-app-75bba.firebaseapp.com",
  databaseURL: "https://letmeask-app-75bba-default-rtdb.firebaseio.com",
  projectId: "letmeask-app-75bba",
  storageBucket: "letmeask-app-75bba.appspot.com",
  messagingSenderId: "2419008624",
  appId: "1:2419008624:web:a703231d2c98338ba140b5",
  measurementId: "G-M2JQLE1QXT"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
