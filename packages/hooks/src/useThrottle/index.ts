import { useState,useEffect,useCallback } from 'react';
type Callback = (...args: any[]) => void;

//针对方法的变化处理onResize

const useThrottle = (callback: Callback, delay: number = 500) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout|null>(null);
  const throttleCallback = useCallback(() => {
    if (timeoutId) {
      return;
    }
    const handler = setTimeout(() => {
      callback();
    }, delay);

    setTimeoutId(handler);
  },[timeoutId, delay,callback]);

  useEffect(()=>{
    return ()=>{
      if(timeoutId){
        clearTimeout(timeoutId);
      }
    }
  },[timeoutId])
  return throttleCallback;
};

// useThrottle(() => {
//   setWindowWidth(window.innerWidth);
// });

export default useThrottle;
