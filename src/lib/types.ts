// Game state and statistics types for the reaction time game

export type GameStatus = 'idle' | 'waiting' | 'ready' | 'clicked' | 'false-start';

export interface GameState {
  status: GameStatus;
  startTime: number | null;
  endTime: number | null;
  reactionTimes: number[];
  currentAttempt: number;
}

export interface ReactionTime {
  time: number;        // milliseconds
  timestamp: Date;     // when the test was taken
  attempt: number;     // attempt number in current session
}

export interface GameStats {
  totalAttempts: number;
  bestTime: number | null;
  averageTime: number | null;
  recentTimes: number[];  // last 5 attempts
}

export interface GameStateActions {
  startGame: () => void;
  setWaiting: () => void;
  setReady: () => void;
  recordClick: () => void;
  recordFalseStart: () => void;
  resetGame: () => void;
  resetStats: () => void;
}