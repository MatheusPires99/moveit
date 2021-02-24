import { createContext, ReactNode, useState } from 'react';

import challenges from '../../challenges.json';

type ChallengesProviderPorps = {
  children: ReactNode;
};

type Challenge = {
  type: 'body' | 'eye';
  description: string;
  amount: number;
};

type ChallengesContextData = {
  level: number;
  currentExpirience: number;
  expirienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
};

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderPorps) {
  const [level, setLevel] = useState(1);
  const [currentExpirience, setCurrentExpirience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const expirienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(state => state + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentExpirience,
        expirienceToNextLevel,
        challengesCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}
