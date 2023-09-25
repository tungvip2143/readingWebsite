import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import ChartBookTour from './ChartBookTour/ChartBookTour';
import ChartRevenue from './ChartRevenue/ChartRevenue';
import ListTour from './ListTour';

const LocalFriendChart = () => {
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: '1.5rem' }}>
      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '70%' }}
      >
        <ChartRevenue />
        <ChartBookTour />
      </CommonStylesClient.Box>
      <CommonStylesClient.Box sx={{ width: '30%' }}>
        <ListTour />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};
export default React.memo(LocalFriendChart);
