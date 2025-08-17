import { useState, useCallback } from 'react';
import { GameState, GameStats, GameStateActions } from '@/lib/types';

const initialGameState: GameState = {
  status: 'idle',
  startTime: null,
  endTime: null,
  reactionTimes: [],
  currentAttempt: 0,
};

const initialGameStats: GameStats = {
  totalAttempts: 0,
  bestTime: null,
  averageTime: null,
  recentTimes: [],
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [gameStats, setGameStats] = useState<GameStats>(initialGameStats);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: 'waiting',
      startTime: null,
      endTime: null,
      currentAttempt: prev.currentAttempt + 1,
    }));
  }, []);

  const setWaiting = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: 'waiting',
      startTime: null,
      endTime: null,
    }));
  }, []);

  const setReady = useCallback(() => {
    const startTime = performance.now();
    setGameState(prev => ({
      ...prev,
      status: 'ready',
      startTime,
      endTime: null,
    }));
  }, []);

  const recordClick = useCallback(() => {
    const endTime = performance.now();
    setGameState(prev => {
      if (prev.status !== 'ready' || prev.startTime === null) {
        return prev;
      }

      const reactionTime = endTime - prev.startTime;
      const newReactionTimes = [...prev.reactionTimes, reactionTime];

      // Update statistics
      setGameStats(prevStats => {
        const newRecentTimes = [...prevStats.recentTimes, reactionTime].slice(-5);
        const newBestTime = prevStats.bestTime === null 
          ? reactionTime 
          : Math.min(prevStats.bestTime, reactionTime);
        const newAverageTime = newReactionTimes.length > 0
          ? newReactionTimes.reduce((sum, time) => sum + time, 0) / newReactionTimes.length
          : null;

        return {
          totalAttempts: prevStats.totalAttempts + 1,
          bestTime: newBestTime,
          averageTime: newAverageTime,
          recentTimes: newRecentTimes,
        };
      });

      return {
        ...prev,
        status: 'clicked',
        endTime,
        reactionTimes: newReactionTimes,
      };
    });
  }, []);

  const recordFalseStart = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: 'false-start',
      startTime: null,
      endTime: null,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  const resetStats = useCallback(() => {
    setGameStats(initialGameStats);
    setGameState(prev => ({
      ...prev,
      reactionTimes: [],
      currentAttempt: 0,
    }));
  }, []);

  const actions: GameStateActions = {
    startGame,
    setWaiting,
    setReady,
    recordClick,
    recordFalseStart,
    resetGame,
    resetStats,
  };

  return {
    gameState,
    gameStats,
    actions,
  };
}