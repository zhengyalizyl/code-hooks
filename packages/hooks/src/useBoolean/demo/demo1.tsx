/**
 * title: 基础用法
 * desc: 默认为 boolean 切换。
 */

import React from 'react';
import { useBoolean} from 'codeHooks';

export default () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean();

  return (
    <div>
      <p>Effects：{`${state}`}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setFalse} style={{ margin: '0 8px' }}>
          Toggle False
        </button>
        <button type="button" onClick={setTrue}>
          Toggle True
        </button>
      </p>
    </div>
  );
};
