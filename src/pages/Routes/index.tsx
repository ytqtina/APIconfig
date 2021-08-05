import { PageContainer } from '@ant-design/pro-layout';
// import { useState, useEffect } from 'react';
// import { Spin } from 'antd';
// import styles from './index.less';
export default () => {
  // const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);
  return (
    <PageContainer>
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        {/* <Spin spinning={loading} size="large" /> */}
      </div>
    </PageContainer>
  );
};
