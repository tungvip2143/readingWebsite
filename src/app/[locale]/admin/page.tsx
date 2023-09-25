'use client';
import React from 'react';
import RevenueMonthCard from 'components/Card/RevenueMonthCard';
import RevenueChartCard from 'components/Card/RevenueChartCard';
import OrderChartCard from 'components/Card/OrderChartCard';
import CommonStyles from 'components/CommonStyles';

const AdminPage = () => {
  return (
    <CommonStyles.Box sx={{ display: 'flex', gap: 4 }}>
      <RevenueMonthCard month={1} revenue={23000} revenueNumber={5.6} />
      <RevenueChartCard revenuePriceNumber={420} revenueNumber={5.6} />
      <OrderChartCard completedNumber={72} />
    </CommonStyles.Box>
  );
};

export default AdminPage;
