import { useTheme } from '@mui/material';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import FormikField from 'components/FormikField';
import { FastField, Field } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Time() {
  //! State
  const theme = useTheme();
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: '2rem 1rem',
        border: `0.0625rem solid ${theme.colors?.bgneutral200}`,
        borderRadius: '0.25rem',
        flex: 1,
        width: 'calc(73% + 0.125rem)',
        marginBottom: '1rem',
      }}
    >
      <CommonStyles.Typography
        variant='h2'
        sx={{
          fontSize: '1.125rem',
          color: theme.colors?.custom?.textGrey,
          fontWeight: 500,
          marginBottom: '2rem',
        }}
      >
        {t('HotDeal.sidebarTime')}
      </CommonStyles.Typography>

      <CommonStyles.Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textGrey,
              fontWeight: 500,
              marginRight: '2rem',
            }}
          >
            {t('HotDeal.from')}
          </CommonStyles.Typography>
          <Field
            component={CustomFields.DatePickerField}
            icon={CommonIcons.IconCalendarOutlined}
            name='from'
            isDayjs
            formatCustom='DD/MM/YYYY'
            sxContainer={{ width: '70%' }}
          />
        </CommonStyles.Box>

        <CommonStyles.Box
          sx={{ display: 'flex', alignItems: 'center', width: '50%', justifyContent: 'flex-end' }}
        >
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textGrey,
              fontWeight: 500,
              marginRight: '2rem',
            }}
          >
            {t('HotDeal.to')}
          </CommonStyles.Typography>
          <FormikField
            component={CustomFields.DatePickerField}
            icon={CommonIcons.IconCalendarOutlined}
            name='to'
            isDayjs
            formatCustom='DD/MM/YYYY'
            sxContainer={{ width: '70%' }}
          />
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
}
