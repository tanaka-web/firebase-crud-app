import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { login } from '../apis/sessions/login';
import { logout } from '../apis/sessions/logout';
import firebase from '../plugins/firebase';

const WITH_AUTH_PATH_LIST = ['/', '/users', '/users/[id]'];

export default () => {
  const [isLogined, setLogined] = useState(false);
  const [isLoginChecked, setLoginCheck] = useState(false);
  const { push, pathname } = useRouter();

  const handleRedirectLogin = useCallback(() => {
    if (!isLoginChecked) return;
    if (!WITH_AUTH_PATH_LIST.includes(pathname)) return;
    if (!isLogined) {
      push('/login');
    }
  }, [isLogined, isLoginChecked, pathname]);

  const handleLogin = useCallback(async (values) => {
    const { email, password } = values;
    await login({ email, password });
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    setLogined(false);
    push('/login');
  }, [isLogined]);

  const handleLoginCheck = useCallback(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLogined(true);
        push('/users');
      } else {
        setLogined(false);
      }
      setLoginCheck(true);
    });
  }, [isLogined, isLoginChecked]);

  return {
    isLogined,
    isLoginChecked,
    handleLogin,
    handleLogout,
    handleLoginCheck,
    handleRedirectLogin,
  };
};
