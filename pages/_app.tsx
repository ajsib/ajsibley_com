import { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';
import AuthCheck from '../utils/AuthCheck';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    const router = require('next/router');
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', stopLoading);
    router.events.on('routeChangeError', stopLoading);

    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', stopLoading);
      router.events.off('routeChangeError', stopLoading);
    };
  }, []);

  // You can set a global loading spinner here if needed
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <MoonLoader size={50} color="#123abc" loading={true} />
      </div>
    );
  }

  // Wrap the component with AuthCheck for authentication and authorization purposes
  return (
    <ThemeProvider theme={theme}>
      <AuthCheck>
        <div 
        style={{
          marginLeft: '-7px',
          marginRight: '-7px',
          overflowX: 'hidden',
        }}
        >
          <Component {...pageProps} />
        </div>
      </AuthCheck>
    </ThemeProvider>
  );
}

export default MyApp;
