# firebase_crud

base: https://github.com/vercel/next.js/tree/canary/examples/with-firebase-hosting

# firebase setting
`src/plugins/firebase.ts` を作成下記を記入
```
import firebase from 'firebase';

if (!firebase.apps.length) {
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
```
