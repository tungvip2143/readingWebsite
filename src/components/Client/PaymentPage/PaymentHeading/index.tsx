import React from 'react';
import { useTranslations } from 'next-intl';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import { useTheme } from '@mui/material';

interface PaymentHeadingProps {}

const Divider = () => {
  const theme = useTheme();
  return (
    <CommonStylesClient.Box
      sx={{
        width: '100%',
        height: '1px',
        marginBottom: '2.5rem',
        background: theme.colors?.client?.midGray,
      }}
    />
  );
};

const PaymentHeading = (props: PaymentHeadingProps) => {
  //! State
  const t = useTranslations('PaymentPage');
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Box
        sx={{
          padding: {
            width: '100%',
            maxWidth: MAX_WIDTH_CONTAINER,
            margin: '0 auto',
          },
        }}
      >
        <CommonStylesClient.Box
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <CommonStylesClient.Typography
            type='pcHeading2'
            sx={{
              letterSpacing: '0.96px',
              color: theme.colors?.client?.darkGray,
            }}
          >
            {t('title')}
          </CommonStylesClient.Typography>
          <Divider />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PaymentHeading);
