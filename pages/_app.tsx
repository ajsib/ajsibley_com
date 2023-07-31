// pages/_app.tsx
import { AppProps } from 'next/app';
import withAuth from '../components/withAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withAuth(MyApp);
