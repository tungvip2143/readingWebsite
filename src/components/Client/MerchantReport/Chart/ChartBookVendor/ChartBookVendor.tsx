import { useTheme } from '@mui/material';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTranslations } from 'next-intl';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBookTour = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations('ReportMerchant');

  //! Function
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const labels = [' 01/07', ' 02/07', ' 04/07', ' 08/07', ' 10/07', ' 13/07', ' 17/07'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Tour',
        borderWidth: 0.5,
        backgroundColor: theme.colors?.client.blue,
        borderColor: theme.colors?.client.blue,
        hoverBackgroundColor: theme.colors?.client.coBaltBlue,
        hoverBorderColor: theme.colors?.client.coBaltBlue,
        data: [28, 10, 15, 7, 25, 20, 12],
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
            {t('numberBooks')}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <CommonStylesClient.Typography type='title12'>
              {t('month')}
            </CommonStylesClient.Typography>
            <CommonIcons.IconArrowDownBlue />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>

        <Bar options={options} data={data} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};
export default React.memo(ChartBookTour);
