import { AppProps } from 'next/app';

import { AuthProvider } from '../contexts/AuthContext';
import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default MyApp;
