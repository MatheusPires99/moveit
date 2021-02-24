import { useContext } from 'react';

import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExpirienceBar.module.css';

export function ExpirenceBar() {
  const { currentExpirience, expirienceToNextLevel } = useContext(
    ChallengeContext,
  );

  const percentToNextLevel = Math.round(
    (currentExpirience * 100) / expirienceToNextLevel,
  );

  return (
    <header className={styles.expirienceBar}>
      <span>0 xp</span>

      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span
          className={styles.currentExpirience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExpirience} px
        </span>
      </div>

      <span>{expirienceToNextLevel} xp</span>
    </header>
  );
}
