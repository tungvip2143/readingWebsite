import React from 'react';
import { useTranslations } from 'next-intl';

import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';

interface RevenueMonthCardProps {
  month: number;
  revenue: number;
  revenueNumber: number;
}

const RevenueMonthCard = (props: RevenueMonthCardProps) => {
  const { month = 0, revenue = 23000, revenueNumber = 5.6 } = props;
  //! State
  const t = useTranslations('Index');
  const theme = useTheme();
  //! Function

  //! Render
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
              {t('revenueMonth', { month: month })}
            </CommonStyles.Typography>
            <CommonStyles.Typography sx={{ fontSize: '2em', color: theme.colors?.primary500 }}>
              {revenue}
            </CommonStyles.Typography>
          </CommonStyles.Box>
          <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <CommonStyles.Typography sx={{ color: theme.colors?.success650, fontSize: '0.875em' }}>
              {`${revenueNumber}%`}
            </CommonStyles.Typography>
            <CommonStyles.Typography
              sx={{ color: theme.colors?.bgneutral500, fontSize: '0.875em' }}
            >
              {t('periodOfChange')}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        </CommonStyles.Box>

        <CommonStyles.Box>
          <CommonStyles.Box
            sx={{
              background: theme.colors?.primary500,
              borderRadius: '0.25em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0.75rem',
            }}
          >
            <CommonIcons.InsertEmoticonIcon
              sx={{
                color: theme.colors?.white,
                width: '1.25em',
                height: '1.25em',
                fontSize: '0.75em',
              }}
            ></CommonIcons.InsertEmoticonIcon>
          </CommonStyles.Box>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(RevenueMonthCard);
