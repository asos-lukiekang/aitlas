import { GameState, GameStats } from './types';

/**
 * Validates if a reaction time is realistic (between 50ms and 2000ms)
 */
export function isValidReactionTime(time: number): boolean {
  return time >= 50 && time <= 2000;
}

/**
 * Calculates statistics from an array of reaction times
 */
export function calculateStats(reactionTimes: number[]): Omit<GameStats, 'recentTimes'> {
  if (reactionTimes.length === 0) {
    return {
      totalAttempts: 0,
      bestTime: null,
      averageTime: null,
    };
  }

  const validTimes = reactionTimes.filter(isValidReactionTime);
  
  return {
    totalAttempts: validTimes.length,
    bestTime: validTimes.length > 0 ? Math.min(...validTimes) : null,
    averageTime: validTimes.length > 0 
      ? validTimes.reduce((sum, time) => sum + time, 0) / validTimes.length 
      : null,
  };
}

/**
 * Determines if a game state transition is valid
 */
export function isValidStateTransition(
  currentStatus: GameState['status'], 
  nextStatus: GameState['status']
): boolean {
  const validTransitions: Record<GameState['status'], GameState['status'][]> = {
    'idle': ['waiting'],
    'waiting': ['ready', 'false-start', 'idle'],
    'ready': ['clicked', 'false-start', 'idle'],
    'clicked': ['waiting', 'idle'],
    'false-start': ['waiting', 'idle'],
  };

  return validTransitions[currentStatus]?.includes(nextStatus) ?? false;
}

/**
 * Formats reaction time for display
 */
export function formatReactionTime(time: number): string {
  return `${Math.round(time)}ms`;
}

/**
 * Gets performance context for a reaction time
 */
export function getPerformanceContext(time: number): {
  category: 'excellent' | 'good' | 'average' | 'slow';
  message: string;
} {
  if (time < 150) {
    return {
      category: 'excellent',
      message: 'Excellent! That\'s faster than most people.',
    };
  } else if (time < 200) {
    return {
      category: 'good',
      message: 'Good reaction time!',
    };
  } else if (time < 300) {
    return {
      category: 'average',
      message: 'Average human reaction time.',
    };
  } else {
    return {
      category: 'slow',
      message: 'Try to react faster next time.',
    };
  }
}