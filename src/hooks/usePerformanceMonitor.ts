import { useCallback, useRef } from 'react';

interface PerformanceMetrics {
  [key: string]: {
    count: number;
    totalTime: number;
    minTime: number;
    maxTime: number;
    p95: number;
    timings: number[];
  };
}

export const usePerformanceMonitor = () => {
  const metrics = useRef<PerformanceMetrics>({});
  const startTimes = useRef<Map<string, number>>(new Map());

  const startMeasurement = useCallback((operation: string) => {
    startTimes.current.set(operation, performance.now());
  }, []);

  const measurePerformance = useCallback((operation: string, duration: number) => {
    if (!metrics.current[operation]) {
      metrics.current[operation] = {
        count: 0,
        totalTime: 0,
        minTime: Infinity,
        maxTime: 0,
        p95: 0,
        timings: [],
      };
    }

    const metric = metrics.current[operation];
    metric.count++;
    metric.totalTime += duration;
    metric.minTime = Math.min(metric.minTime, duration);
    metric.maxTime = Math.max(metric.maxTime, duration);
    metric.timings.push(duration);

    // Calculate p95
    if (metric.timings.length > 0) {
      const sortedTimings = [...metric.timings].sort((a, b) => a - b);
      const p95Index = Math.floor(sortedTimings.length * 0.95);
      metric.p95 = sortedTimings[p95Index];
    }

    // Log performance metrics if they exceed thresholds
    if (duration > 400) {
      console.warn(`Performance warning: ${operation} took ${duration.toFixed(2)}ms`);
    }

    // Keep only last 100 measurements to prevent memory growth
    if (metric.timings.length > 100) {
      metric.timings.shift();
    }
  }, []);

  const getMetrics = useCallback(() => {
    return Object.entries(metrics.current).map(([operation, metric]) => ({
      operation,
      averageTime: metric.totalTime / metric.count,
      minTime: metric.minTime,
      maxTime: metric.maxTime,
      p95: metric.p95,
      count: metric.count,
    }));
  }, []);

  const resetMetrics = useCallback(() => {
    metrics.current = {};
    startTimes.current.clear();
  }, []);

  return {
    startMeasurement,
    measurePerformance,
    getMetrics,
    resetMetrics,
  };
}; 