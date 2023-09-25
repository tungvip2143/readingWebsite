import React from 'react';
import { useTheme } from '@mui/material';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomFields from 'components/CustomFields';
import CommonIcons from 'components/Client/CommonIcons';

interface CheckoutSelectProps {}

const CheckoutSelect = (props: CheckoutSelectProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('FindTour');

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.75rem' }}>
      <CommonIcons.IconCheckOut />
      <FastField
        name='checkOutDate'
        component={CustomFields.DatePickerField}
        sxContainer={{
          input: {
            padding: '0 !important',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.4rem',
            color: theme.colors?.client?.gray,
            [':hover']: {
              cursor: 'pointer',
            },
          },
          fieldset: {
            border: '0',
          },
        }}
        isMobileDatePicker
        text={
          <CommonStylesClient.Typography type='title16' sx={{ marginBottom: '4px' }}>
            {t('checkOut')}
          </CommonStylesClient.Typography>
        }
      />
    </CommonStylesClient.Box>
  );
};

export default React.memo(CheckoutSelect);
