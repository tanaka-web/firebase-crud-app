import firebase from '../../plugins/firebase';

type Params = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: Params) => {
  await firebase.auth().onAuthStateChanged((user) => {
    check = user ? true : false;
  });
};
