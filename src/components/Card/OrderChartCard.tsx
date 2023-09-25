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
import { Doughnut } from 'react-chartjs-2';
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

interface OrderChartCardProps {
  completedNumber: number;
}

const OrderChartCard = (props: OrderChartCardProps) => {
  const { completedNumber } = props;
  //! State
  const t = useTranslations('Index');
  const theme = useTheme();

  //! Function
  const renderChartOrder = () => {
    const dataOrder = {
      labels: ['Data', 'Data 1'],
      datasets: [
        {
          label: '',
          data: [12, 19],
          backgroundColor: [theme.colors?.primary550, theme.colors?.primary150],
          borderColor: [theme.colors?.primary550, theme.colors?.primary150],
          borderWidth: 1,
          circumference: 180,
          rotation: 270,
          cutout: 90,
          width: 180,
          height: 180,
        },
      ],
    };

    return <Doughnut data={dataOrder} />;
  };

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        boxShadow: ` 0em 1.0625em 2.1875em rgba(50, 50, 105, 0.12), 0em 0em 0.125em rgba(0, 0, 0, 0.05)`,
        borderRadius: '0.25em',
        width: '25.3125em',
        height: '20.5em',
        padding: '1em 1.5em',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <CommonStyles.Typography
        sx={{ fontSize: '0.875em', color: theme.colors?.bgneutral700, fontWeight: 'bold' }}
      >
        {t('orderName')}
      </CommonStyles.Typography>
      <CommonStyles.Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: '1.5rem',
          position: 'relative',
        }}
      >
        {renderChartOrder()}
        <CommonStyles.Box
          sx={{
            position: 'absolute',
            bottom: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <CommonStyles.Typography sx={{ fontSize: '0.875em', color: theme.colors?.bgneutral500 }}>
            {t('completed')}
          </CommonStyles.Typography>
          <CommonStyles.Typography sx={{ fontSize: '1.25em', color: theme.colors?.bgneutral900 }}>
            {`${completedNumber}%`}
          </CommonStyles.Typography>
          <CommonStyles.Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CommonStyles.Typography
              sx={{ fontSize: '1.25em', fontWeight: 'bold', color: theme.colors?.bgneutral900 }}
            >
              $152k
            </CommonStyles.Typography>
            <CommonStyles.Typography sx={{ fontSize: '1.25em', color: theme.colors?.bgneutral500 }}>
              /
            </CommonStyles.Typography>
            <CommonStyles.Typography sx={{ fontSize: '1.25em', color: theme.colors?.bgneutral500 }}>
              $220k
            </CommonStyles.Typography>
          </CommonStyles.Box>
          <CommonStyles.Button sx={{ background: theme.colors?.primary500, width: 300 }}>
            View Report
          </CommonStyles.Button>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(OrderChartCard);
