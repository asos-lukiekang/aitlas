import { renderHook, act } from '@testing-library/react';
import { useGameState } from './useGameState';

// Mock performance.now() for consistent testing
const mockPerformanceNow = jest.fn();
Object.defineProperty(window, 'performance', {
  value: {
    now: mockPerformanceNow,
  },
});

describe('useGameState', () => {
  beforeEach(() => {
    mockPerformanceNow.mockClear();
    mockPerformanceNow.mockReturnValue(1000);
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useGameState());

    expect(result.current.gameState).toEqual({
      status: 'idle',
      startTime: null,
      endTime: null,
      reactionTimes: [],
      currentAttempt: 0,
    });

    expect(result.current.gameStats).toEqual({
      totalAttempts: 0,
      bestTime: null,
      averageTime: null,
      recentTimes: [],
    });
  });

  it('should start game and increment attempt counter', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.actions.startGame();
    });

    expect(result.current.gameState.status).toBe('waiting');
    expect(result.current.gameState.currentAttempt).toBe(1);
    expect(result.current.gameState.startTime).toBeNull();
    expect(result.current.gameState.endTime).toBeNull();
  });

  it('should set waiting state and clear timing data', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.actions.setWaiting();
    });

    expect(result.current.gameState.status).toBe('waiting');
    expect(result.current.gameState.startTime).toBeNull();
    expect(result.current.gameState.endTime).toBeNull();
  });

  it('should set ready state with start time', () => {
    const { result } = renderHook(() => useGameState());
    mockPerformanceNow.mockReturnValue(2000);

    act(() => {
      result.current.actions.setReady();
    });

    expect(result.current.gameState.status).toBe('ready');
    expect(result.current.gameState.startTime).toBe(2000);
    expect(result.current.gameState.endTime).toBeNull();
  });

  it('should record click and calculate reaction time', () => {
    const { result } = renderHook(() => useGameState());
    
    // Set up ready state
    mockPerformanceNow.mockReturnValue(1000);
    act(() => {
      result.current.actions.setReady();
    });

    // Record click
    mockPerformanceNow.mockReturnValue(1250);
    act(() => {
      result.current.actions.recordClick();
    });

    expect(result.current.gameState.status).toBe('clicked');
    expect(result.current.gameState.endTime).toBe(1250);
    expect(result.current.gameState.reactionTimes).toEqual([250]);
    
    // Check stats update
    expect(result.current.gameStats.totalAttempts).toBe(1);
    expect(result.current.gameStats.bestTime).toBe(250);
    expect(result.current.gameStats.averageTime).toBe(250);
    expect(result.current.gameStats.recentTimes).toEqual([250]);
  });

  it('should not record click if not in ready state', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.actions.recordClick();
    });

    expect(result.current.gameState.status).toBe('idle');
    expect(result.current.gameState.reactionTimes).toEqual([]);
    expect(result.current.gameStats.totalAttempts).toBe(0);
  });

  it('should record false start and clear timing data', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.actions.recordFalseStart();
    });

    expect(result.current.gameState.status).toBe('false-start');
    expect(result.current.gameState.startTime).toBeNull();
    expect(result.current.gameState.endTime).toBeNull();
  });

  it('should reset game to initial state after modifications', () => {
    const { result } = renderHook(() => useGameState());

    // Modify state first
    act(() => {
      result.current.actions.startGame();
      result.current.actions.setReady();
    });

    // Verify state was modified
    expect(result.current.gameState.status).toBe('ready');
    expect(result.current.gameState.currentAttempt).toBe(1);

    // Reset and verify complete reset
    act(() => {
      result.current.actions.resetGame();
    });

    expect(result.current.gameState).toEqual({
      status: 'idle',
      startTime: null,
      endTime: null,
      reactionTimes: [],
      currentAttempt: 0,
    });
  });

  it('should reset stats and clear game history', () => {
    const { result } = renderHook(() => useGameState());

    // Add some reaction times first
    mockPerformanceNow.mockReturnValue(1000);
    act(() => {
      result.current.actions.setReady();
    });

    mockPerformanceNow.mockReturnValue(1200);
    act(() => {
      result.current.actions.recordClick();
    });

    // Verify stats were populated
    expect(result.current.gameStats.totalAttempts).toBe(1);
    expect(result.current.gameState.reactionTimes).toHaveLength(1);

    // Reset stats and verify complete reset
    act(() => {
      result.current.actions.resetStats();
    });

    expect(result.current.gameStats).toEqual({
      totalAttempts: 0,
      bestTime: null,
      averageTime: null,
      recentTimes: [],
    });

    expect(result.current.gameState.reactionTimes).toEqual([]);
    expect(result.current.gameState.currentAttempt).toBe(0);
  });

  it('should track multiple attempts and calculate stats correctly', () => {
    const { result } = renderHook(() => useGameState());

    // First attempt: 200ms
    mockPerformanceNow.mockReturnValue(1000);
    act(() => {
      result.current.actions.setReady();
    });

    mockPerformanceNow.mockReturnValue(1200);
    act(() => {
      result.current.actions.recordClick();
    });

    // Second attempt: 150ms (better time)
    mockPerformanceNow.mockReturnValue(2000);
    act(() => {
      result.current.actions.setReady();
    });

    mockPerformanceNow.mockReturnValue(2150);
    act(() => {
      result.current.actions.recordClick();
    });

    expect(result.current.gameState.reactionTimes).toEqual([200, 150]);
    expect(result.current.gameStats.totalAttempts).toBe(2);
    expect(result.current.gameStats.bestTime).toBe(150); // Should track best time
    expect(result.current.gameStats.averageTime).toBe(175); // (200 + 150) / 2
    expect(result.current.gameStats.recentTimes).toEqual([200, 150]);
  });

  it('should limit recent times to last 5 attempts', () => {
    const { result } = renderHook(() => useGameState());

    // Add 6 attempts to test the sliding window
    const times = [100, 150, 200, 250, 300, 350];
    
    times.forEach((time, index) => {
      mockPerformanceNow.mockReturnValue(1000 + index * 1000);
      act(() => {
        result.current.actions.setReady();
      });

      mockPerformanceNow.mockReturnValue(1000 + index * 1000 + time);
      act(() => {
        result.current.actions.recordClick();
      });
    });

    // Should only keep the last 5 times (dropping the first 100ms)
    expect(result.current.gameStats.recentTimes).toEqual([150, 200, 250, 300, 350]);
    expect(result.current.gameStats.recentTimes.length).toBe(5);
    
    // But all times should still be tracked in game state
    expect(result.current.gameState.reactionTimes).toHaveLength(6);
  });

  it('should handle edge case of clicking before ready state', () => {
    const { result } = renderHook(() => useGameState());

    // Try to click while in idle state
    act(() => {
      result.current.actions.recordClick();
    });

    expect(result.current.gameState.status).toBe('idle');
    expect(result.current.gameState.reactionTimes).toEqual([]);
    expect(result.current.gameStats.totalAttempts).toBe(0);
  });

  it('should maintain timing precision with performance.now()', () => {
    const { result } = renderHook(() => useGameState());

    mockPerformanceNow.mockReturnValue(1000.123);
    act(() => {
      result.current.actions.setReady();
    });

    mockPerformanceNow.mockReturnValue(1234.567);
    act(() => {
      result.current.actions.recordClick();
    });

    // Should preserve decimal precision (using toBeCloseTo for floating point)
    expect(result.current.gameState.reactionTimes[0]).toBeCloseTo(234.444, 2);
    expect(result.current.gameState.startTime).toBe(1000.123);
    expect(result.current.gameState.endTime).toBe(1234.567);
  });
});