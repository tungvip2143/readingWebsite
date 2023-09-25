import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import ChartBookVendor from './ChartBookVendor/ChartBookVendor';
import ChartRevenue from './ChartRevenue/ChartRevenue';

const LocalFriendChart = () => {
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: '1.5rem' }}>
      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '70%' }}
      >
        <ChartRevenue />
        <ChartBookVendor />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};
export default React.memo(LocalFriendChart);
