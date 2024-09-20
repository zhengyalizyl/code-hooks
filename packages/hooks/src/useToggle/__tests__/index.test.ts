import { renderHook, act } from '@testing-library/react';

import useToggle from '../index';

const callToggle = (hook: any) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};

const callLeft = (hook: any) => {
  act(() => {
    hook.result.current[1].setLeft();
  });
};

const callRight = (hook: any) => {
  act(() => {
    hook.result.current[1].setRight();
  });
};

describe('useToggle', () => {
  it('test empty params', () => {
    const hook = renderHook(() => useToggle());
    // console.log('hook', hook);
    expect(hook.result.current[0]).toBeFalsy();
  });

  it('test one params', () => {
    const hook = renderHook(() => useToggle('zyl'));
    expect(hook.result.current[0]).toBe('zyl');
    callToggle(hook);
    expect(hook.result.current[0]).toBeFalsy();
    callLeft(hook);
    expect(hook.result.current[0]).toBe('zyl');
    callRight(hook);
    expect(hook.result.current[0]).toBeFalsy();
  });

  it('test two params', () => {
    const hook = renderHook(() => useToggle('zyl', 'zyl12'));
    callToggle(hook);
    expect(hook.result.current[0]).toBe('zyl12');
    act(() => {
      hook.result.current[1].set('zyl12');
    });

    expect(hook.result.current[0]).toBe('zyl12');
    callToggle(hook);
    expect(hook.result.current[0]).toBe('zyl');
  });
});
