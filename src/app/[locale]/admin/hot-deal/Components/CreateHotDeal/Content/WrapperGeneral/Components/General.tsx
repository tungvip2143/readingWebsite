import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { FastField, Field, useFormikContext } from 'formik';
import useConstants from 'hooks/useConstants';
import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function General() {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const { optionsBannerType } = useConstants();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: '2rem 1rem',
        border: `0.0625rem solid ${theme.colors?.bgneutral200}`,
        borderRadius: '0.25rem',
        flex: 1,
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
        {t('HotDeal.sidebarGeneralInformation')}
      </CommonStyles.Typography>
      <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
        <CommonStyles.Typography
          variant='h4'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textBlack,
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}
        >
          {t('HotDeal.hotDealName')}
        </CommonStyles.Typography>
        <FastField
          name='name'
          component={CustomFields.TextField}
          size='small'
          sx={{
            color: theme.colors?.custom?.textBlack,
          }}
          fullWidth
        />
      </CommonStyles.Box>

      <CommonStyles.Box sx={{ display: 'flex', gap: '4rem' }}>
        <CommonStyles.Box
          sx={{
            marginBottom: '1rem',
            width: '50%',
            '& div': {
              width: '100%',
            },
          }}
        >
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
              marginRight: '3rem',
            }}
          >
            {t('HotDeal.bannerType')}
          </CommonStyles.Typography>
          <Field
            name='bannerType'
            component={CustomFields.SelectField}
            options={optionsBannerType}
            className='banner-type'
            fullWidth
            size='small'
          />
        </CommonStyles.Box>

        <CommonStyles.Box sx={{ width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
              marginRight: '3rem',
            }}
          >
            {t('HotDeal.bannerId')}
          </CommonStyles.Typography>
          <FastField
            name='bannerId'
            component={CustomFields.TextField}
            size='small'
            sx={{
              color: theme.colors?.custom?.textBlack,
            }}
            fullWidth
          />
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Box>
        <CommonStyles.Typography
          variant='h4'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textBlack,
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}
        >
          {t('HotDeal.description')}
        </CommonStyles.Typography>
        <FastField
          name='description'
          component={CustomFields.Textarea}
          size='small'
          sx={{
            color: theme.colors?.custom?.textBlack,
            height: '5rem',
          }}
          fullWidth
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
}
