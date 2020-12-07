import firebase from 'firebase';

if (!firebase.apps.length) {
  // TODO: firebase 設定追加
  firebase.initializeApp({
    apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    authDomain: 'xxxxxxxxxxxxxxxx.firebaseapp.com',
    databaseURL: 'https://xxxxxxxxxxxxxxxx.firebaseio.com',
    projectId: 'xxxxxxxxxxxxxxxx',
    storageBucket: 'xxxxxxxxxxxxxxxx.appspot.com',
    messagingSenderId: 'xxxxxxxxxxxxx',
    appId: 'x:xxxxxxxxxxxxx:web:xxxxxxxxxxxxxxxx',
  });
}

export default firebase;
