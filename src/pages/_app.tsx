import { AppProps } from 'next/app';

import { ChallengesProvider } from '../contexts/ChallengeContext';

import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChallengesProvider>
    <Component {...pageProps} />
  </ChallengesProvider>
);

export default MyApp;
