import firebase from '../../plugins/firebase';

export const logout = async () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.alert('ログアウトしました');
      // Sign-out successful.
    })
    .catch(function (error) {
      window.alert('ログアウトに失敗しました');
      // An error happened.
    });
};
