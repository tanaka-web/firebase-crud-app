import firebase from 'firebase';
import { firebaseConfig } from '../../firebaseConfig';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
export const db = firebase.firestore();
