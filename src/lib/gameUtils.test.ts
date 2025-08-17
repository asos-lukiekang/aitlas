import {
  isValidReactionTime,
  calculateStats,
  isValidStateTransition,
  formatReactionTime,
  getPerformanceContext,
} from './gameUtils';
import type { GameState } from './types';

describe('gameUtils', () => {
  describe('isValidReactionTime', () => {
    it.each([
      [100, true, 'typical valid time'],
      [200, true, 'good reaction time'],
      [500, true, 'average reaction time'],
      [1500, true, 'slow but valid time'],
      [50, true, 'minimum valid boundary'],
      [2000, true, 'maximum valid boundary'],
    ])('should return %s for %s (%s)', (time: number, expected: boolean) => {
      expect(isValidReactionTime(time)).toBe(expected);
    });

    it.each([
      [30, 'too fast (below 50ms)'],
      [2500, 'too slow (above 2000ms)'],
      [-100, 'negative value'],
      [49, 'just below minimum'],
      [2001, 'just above maximum'],
    ])('should return false for %sms (%s)', (time: number) => {
      expect(isValidReactionTime(time)).toBe(false);
    });
  });

  describe('calculateStats', () => {
    it('should return empty stats for empty array', () => {
      const stats = calculateStats([]);
      expect(stats).toEqual({
        totalAttempts: 0,
        bestTime: null,
        averageTime: null,
      });
    });

    it('should calculate stats correctly for valid times', () => {
      const times = [200, 150, 300, 250];
      const stats = calculateStats(times);

      expect(stats.totalAttempts).toBe(4);
      expect(stats.bestTime).toBe(150);
      expect(stats.averageTime).toBe(225);
    });

    it('should filter out invalid times', () => {
      const times = [30, 200, 150, 2500, 300]; // 30 and 2500 are invalid
      const stats = calculateStats(times);

      expect(stats.totalAttempts).toBe(3); // Only valid times counted
      expect(stats.bestTime).toBe(150);
      expect(stats.averageTime).toBe((200 + 150 + 300) / 3);
    });

    it('should handle all invalid times', () => {
      const times = [30, 2500, -100];
      const stats = calculateStats(times);

      expect(stats.totalAttempts).toBe(0);
      expect(stats.bestTime).toBeNull();
      expect(stats.averageTime).toBeNull();
    });
  });

  describe('isValidStateTransition', () => {
    it.each([
      ['idle', 'waiting', true],
      ['waiting', 'ready', true],
      ['waiting', 'false-start', true],
      ['waiting', 'idle', true],
      ['ready', 'clicked', true],
      ['ready', 'false-start', true],
      ['ready', 'idle', true],
      ['clicked', 'waiting', true],
      ['clicked', 'idle', true],
      ['false-start', 'waiting', true],
      ['false-start', 'idle', true],
    ])('should allow valid transition from %s to %s', (from: GameState['status'], to: GameState['status'], expected: boolean) => {
      expect(isValidStateTransition(from, to)).toBe(expected);
    });

    it.each([
      ['idle', 'ready'],
      ['idle', 'clicked'],
      ['idle', 'false-start'],
      ['waiting', 'clicked'],
      ['ready', 'waiting'],
      ['clicked', 'ready'],
      ['clicked', 'false-start'],
      ['false-start', 'ready'],
      ['false-start', 'clicked'],
    ])('should reject invalid transition from %s to %s', (from: GameState['status'], to: GameState['status']) => {
      expect(isValidStateTransition(from, to)).toBe(false);
    });
  });

  describe('formatReactionTime', () => {
    it.each([
      [123.456, '123ms'],
      [200, '200ms'],
      [99.9, '100ms'],
      [123.4, '123ms'],
      [123.6, '124ms'],
      [0, '0ms'],
      [1000.7, '1001ms'],
    ])('should format %sms as "%s"', (input: number, expected: string) => {
      expect(formatReactionTime(input)).toBe(expected);
    });
  });

  describe('getPerformanceContext', () => {
    it.each([
      [120, 'excellent', 'Excellent! That\'s faster than most people.'],
      [149, 'excellent', 'Excellent! That\'s faster than most people.'],
      [150, 'good', 'Good reaction time!'],
      [180, 'good', 'Good reaction time!'],
      [199, 'good', 'Good reaction time!'],
      [200, 'average', 'Average human reaction time.'],
      [250, 'average', 'Average human reaction time.'],
      [299, 'average', 'Average human reaction time.'],
      [300, 'slow', 'Try to react faster next time.'],
      [350, 'slow', 'Try to react faster next time.'],
    ])(
      'should categorize %sms as %s with correct message',
      (time: number, expectedCategory: string, expectedMessage: string) => {
        const result = getPerformanceContext(time);
        expect(result.category).toBe(expectedCategory);
        expect(result.message).toBe(expectedMessage);
      }
    );
  });
});