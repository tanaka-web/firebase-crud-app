import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.css';
import useAuth from '../hooks/auth';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppProps) => {
  const { isLogined, isLoginChecked, handleLoginCheck, handleRedirectLogin } = useAuth();
  const { pathname } = useRouter();
  useEffect(() => {
    handleLoginCheck();
  }, []);
  useEffect(() => {
    handleRedirectLogin();
  }, [pathname, isLoginChecked]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      {isLoginChecked && (
        <>
          {isLogined && <Header />}
          <Component {...pageProps} />
        </>
      )}
    </>
  );
};

export default App;
