// import { useState, useEffect } from 'react';
// import { Spin } from 'antd';
// import styles from './index.less';
import BasicLayout from './BasicLayout';

export default () => {
  if (!window.localStorage.getItem('starList')) {
    window.localStorage.setItem('starList', JSON.stringify([]));
  } // const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  return (
    <div
      style={{
        margin: -24,
      }}
    >
      <BasicLayout />
    </div> // <div
    //   style={{
    //     paddingTop: 100,
    //     textAlign: 'center',
    //   }}
    // >
    //   {/* <Spin spinning={loading} size="large" /> */}
    // </div>
  );
};
