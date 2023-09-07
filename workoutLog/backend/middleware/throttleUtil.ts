type ThrottleFunction = (...args: any[]) => void;

export default function throttle(func: ThrottleFunction, limit: number): ThrottleFunction {
  let inThrottle: boolean;

  return function (...args: any[]) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}