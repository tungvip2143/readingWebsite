import { useTheme } from '@mui/material';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTranslations } from 'next-intl';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const ChartRevenue = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations('ReportLocalFiend');

  //! Function
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const labels = ['11/10', '12/10', '13/10', '14/10', '15/10', '16/10', '17/10'];

  const data = {
    labels,
    datasets: [
      {
        fill: false,
        data: [200, 220, 290, 260, 100, 180, 210, 0],
        borderColor: theme.colors?.client.blue,
      },
    ],
  };

  //! Render

  return (
    <CommonStylesClient.Box
      sx={{
        backgroundColor: theme.colors?.client.white,
        borderRadius: '1rem',
      }}
    >
      <CommonStylesClient.Box
        sx={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        <CommonStylesClient.Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CommonStylesClient.Typography type='mobiHeading3'>
            {t('yourRevenue')}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <CommonStylesClient.Typography type='title12'>
              {t('week')}
            </CommonStylesClient.Typography>
            <CommonIcons.IconArrowDownBlue />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>

        <Line options={options} data={data} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};
export default React.memo(ChartRevenue);
