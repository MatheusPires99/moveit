import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { LevelUpModal } from '../components/LevelUpModal';
import challenges from '../../challenges.json';

type ChallengesProviderPorps = {
  level: number;
  currentExpirience: number;
  challengesCompleted: number;
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
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
};

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderPorps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExpirience, setCurrentExpirience] = useState(
    rest.currentExpirience ?? 0,
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0,
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const expirienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExpirience', String(currentExpirience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExpirience, challengesCompleted]);

  function levelUp() {
    setLevel(state => state + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} xp`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (activeChallenge) {
      const { amount } = activeChallenge;

      let finalExpirience = currentExpirience + amount;

      if (finalExpirience >= expirienceToNextLevel) {
        finalExpirience -= expirienceToNextLevel;
        levelUp();
      }

      setCurrentExpirience(finalExpirience);
      setActiveChallenge(null);
      setChallengesCompleted(state => state + 1);
    }
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
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
}
