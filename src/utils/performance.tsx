import { useEffect, useRef } from 'react';

// Performance budget constants
export const PERFORMANCE_BUDGETS = {
  RENDER: 150, // ms
  API_CALL: 100, // ms
  DATA_PROCESSING: 150, // ms
  TOTAL: 400, // ms
};

// Performance measurement utilities
const performanceMetrics: Record<string, number[]> = {};

export const measurePerformance = (metricName: string, startTime: number) => {
  const duration = performance.now() - startTime;
  if (!performanceMetrics[metricName]) {
    performanceMetrics[metricName] = [];
  }
  performanceMetrics[metricName].push(duration);

  // Log to analytics if duration exceeds threshold
  if (duration > 1000) {
    console.warn(`Performance warning: ${metricName} took ${duration.toFixed(2)}ms`);
    // TODO: Send to analytics service
  }
};

// Component performance optimization
export const withPerformanceTracking = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) => {
  return function PerformanceTrackedComponent(props: P) {
    const renderStartTime = useRef(performance.now());
    const mountStartTime = useRef(performance.now());

    useEffect(() => {
      const mountDuration = performance.now() - mountStartTime.current;
      measurePerformance(`${componentName}_mount`, mountStartTime.current);

      return () => {
        measurePerformance(`${componentName}_unmount`, performance.now());
      };
    }, []);

    useEffect(() => {
      const renderDuration = performance.now() - renderStartTime.current;
      measurePerformance(`${componentName}_render`, renderStartTime.current);
      renderStartTime.current = performance.now();
    });

    return <WrappedComponent {...props} />;
  };
};

// API call optimization with caching
const apiCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const optimizeApiCall = async <T>(
  apiCall: () => Promise<T>,
  cacheKey: string
): Promise<T> => {
  const startTime = performance.now();

  // Check cache
  const cached = apiCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    measurePerformance(`${cacheKey}_cache_hit`, startTime);
    return cached.data;
  }

  try {
    const result = await apiCall();
    
    // Update cache
    apiCache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });

    measurePerformance(`${cacheKey}_api_call`, startTime);
    return result;
  } catch (error) {
    measurePerformance(`${cacheKey}_error`, startTime);
    throw error;
  }
};

// Data processing optimization
export const optimizeDataProcessing = <T, R>(
  data: T,
  processor: (data: T) => R,
  name: string
): R => {
  const startTime = performance.now();
  try {
    const result = processor(data);
    const duration = performance.now() - startTime;
    
    if (duration > PERFORMANCE_BUDGETS.DATA_PROCESSING) {
      console.warn(
        `Data processing ${name} exceeded budget: ${duration.toFixed(2)}ms`
      );
    }
    
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error(
      `Data processing ${name} failed after ${duration.toFixed(2)}ms:`,
      error
    );
    throw error;
  }
};

// Memory optimization
export const optimizeMemory = () => {
  const memoryUsage = performance.memory;
  if (memoryUsage) {
    const usedHeap = memoryUsage.usedJSHeapSize / 1024 / 1024;
    const totalHeap = memoryUsage.totalJSHeapSize / 1024 / 1024;
    
    if (usedHeap > totalHeap * 0.8) {
      console.warn(`High memory usage: ${usedHeap.toFixed(2)}MB / ${totalHeap.toFixed(2)}MB`);
    }
  }
};

// Debounce utility for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Performance monitoring service
export const PerformanceMonitor = {
  getMetrics: () => {
    const metrics: Record<string, { avg: number; min: number; max: number }> = {};
    
    Object.entries(performanceMetrics).forEach(([key, values]) => {
      const sum = values.reduce((a, b) => a + b, 0);
      metrics[key] = {
        avg: sum / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
      };
    });

    return metrics;
  },

  clearMetrics: () => {
    Object.keys(performanceMetrics).forEach(key => {
      performanceMetrics[key] = [];
    });
  },

  logMetrics: () => {
    const metrics = PerformanceMonitor.getMetrics();
    console.table(metrics);
  },
}; 