import React from 'react';
import CommonStyles from 'components/CommonStyles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Tooltip
);

interface RevenueChartCardProps {
  revenuePriceNumber: number;
  revenueNumber: number;
}

const RevenueChartCard = (props: RevenueChartCardProps) => {
  const { revenuePriceNumber, revenueNumber } = props;
  //! State
  const t = useTranslations('Index');
  const theme = useTheme();

  //! Function

  //! Render
  const renderChart = () => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: false,
        },
      },
    };
    const labels = ['', '', ''];

    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: [300, 200, 140],
          backgroundColor: theme.colors?.primary500,
        },
        {
          label: 'Dataset 2',
          data: [200, 200, 120],
          backgroundColor: theme.colors?.primary150,
        },
      ],
    };

    return <Bar options={options} data={data} width={150} height={300} />;
  };

  return (
    <CommonStyles.Box
      sx={{
        boxShadow: ` 0em 1.0625em 2.1875em rgba(50, 50, 105, 0.12), 0em 0em 0.125em rgba(0, 0, 0, 0.05)`,
        borderRadius: '0.25em',
        width: '25.3125em',
        height: '20.5em',
        padding: '1em',
      }}
    >
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
        <CommonStyles.Box
          sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}
        >
          <CommonStyles.Box>
            <CommonStyles.Typography
              sx={{ fontSize: '0.875em', color: theme.colors?.bgneutral500, fontWeight: 'bold' }}
            >
              {t('revenue')}
            </CommonStyles.Typography>
          </CommonStyles.Box>
          <CommonStyles.Box>
            <CommonStyles.Typography
              sx={{ fontSize: '2.5em', color: theme.colors?.bgneutral900, fontWeight: 'bold' }}
            >
              {`$${revenuePriceNumber}`}
            </CommonStyles.Typography>
          </CommonStyles.Box>
          <CommonStyles.Box>
            <CommonStyles.Typography sx={{ color: theme.colors?.success650, fontSize: '0.875em' }}>
              {`${revenueNumber}%`}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        </CommonStyles.Box>

        <CommonStyles.Box sx={{ display: 'flex', height: '100%' }}>
          {renderChart()}
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(RevenueChartCard);
