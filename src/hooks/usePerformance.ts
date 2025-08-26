import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const measurePerformance = () => {
      // Wait for page to fully load
      if (document.readyState === 'complete') {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
        const lcp = performance.getEntriesByType('largest-contentful-paint')[0];
        const cls = performance.getEntriesByType('layout-shift')[0];

        const performanceMetrics: PerformanceMetrics = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstContentfulPaint: fcp ? fcp.startTime : 0,
          largestContentfulPaint: lcp ? lcp.startTime : 0,
          cumulativeLayoutShift: cls ? (cls as any).value : 0,
          firstInputDelay: 0 // Would need to be measured with event listeners
        };

        setMetrics(performanceMetrics);

        // Log performance metrics
        console.log('Performance Metrics:', performanceMetrics);

        // Send to analytics in production
        if (process.env.NODE_ENV === 'production') {
          // Example: send to Google Analytics, custom analytics, etc.
          // gtag('event', 'performance', performanceMetrics);
        }
      } else {
        // If page not fully loaded, wait for load event
        window.addEventListener('load', measurePerformance, { once: true });
      }
    };

    // Start measuring when component mounts
    measurePerformance();

    // Cleanup
    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  return metrics;
};

// Hook for measuring component render performance
export const useRenderPerformance = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);

      // Log slow renders
      if (renderTime > 16) { // 60fps threshold
        console.warn(`${componentName} took ${renderTime.toFixed(2)}ms to render (slow)`);
      }
    };
  });
};

// Hook for measuring API call performance
export const useApiPerformance = () => {
  const measureApiCall = async <T>(
    apiCall: () => Promise<T>,
    endpoint: string
  ): Promise<T> => {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`API call to ${endpoint} took ${duration.toFixed(2)}ms`);

      // Log slow API calls
      if (duration > 1000) {
        console.warn(`Slow API call to ${endpoint}: ${duration.toFixed(2)}ms`);
      }

      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.error(`API call to ${endpoint} failed after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  };

  return { measureApiCall };
};
