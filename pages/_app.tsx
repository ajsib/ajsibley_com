import { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';
import AuthCheck from '../utils/AuthCheck';

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
    <AuthCheck>
      {/* Add a container div to limit the width of the website */}
      <div style={{ maxWidth: '350px', margin: '0 auto' }}>
        <Component {...pageProps} />
      </div>
    </AuthCheck>
  );
}

export default MyApp;