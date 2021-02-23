import Head from 'next/head';

import { ExpirenceBar } from "../components/ExpirenceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <div className={styles.container}>
        <ExpirenceBar />

        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>

          <div></div>
        </section>
      </div>
    </>
  );
}
