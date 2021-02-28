import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ExpirenceBar } from '../components/ExpirenceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';

import { ChallengesProvider } from '../contexts/ChallengeContext';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Dashboard.module.css';

type DashboardProps = {
  level: number;
  currentExpirience: number;
  challengesCompleted: number;
};

export default function Dashboard({
  level,
  currentExpirience,
  challengesCompleted,
}: DashboardProps) {
  return (
    <ChallengesProvider
      level={level}
      currentExpirience={currentExpirience}
      challengesCompleted={challengesCompleted}
    >
      <Head>
        <title>Dashboard | move.it</title>
      </Head>

      <div className={styles.container}>
        <ExpirenceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { level, currentExpirience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExpirience: Number(currentExpirience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
