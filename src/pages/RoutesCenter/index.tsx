// import { useState, useEffect } from 'react';
// import { Spin } from 'antd';
// import styles from './index.less';
import BasicLayout from './BasicLayout';

export default () => {
  if (!window.localStorage.getItem('starList')) {
    window.localStorage.setItem('starList', JSON.stringify([]));
  }

  return (
    <div
      style={{
        margin: -24,
      }}
    >
      <BasicLayout />
    </div>
  );
};
