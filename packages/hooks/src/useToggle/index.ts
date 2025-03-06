import { useState, useMemo } from 'react';

export interface Action<T> {
  setLeft: () => void;
  setRight: () => void;
  toggle: () => void;
  set: (value: T) => void;
}

// 一个参数boolen
function useToggle<T = boolean>(): [boolean, Action<T>];

// defaultValue有值
function useToggle<T>(defaultValue: T): [T, Action<T>];

// defaultValue有值，reverseValue有值
function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Action<T | U>];

function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue);

  const actions = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

    const toggle = () => setState((s: D) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    const set = (value: D | R) => setState(value);
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);

    return {
      setLeft,
      setRight,
      toggle,
      set,
    };
  }, []); // 优化代码

  return [state, actions];
}

export default useToggle;
