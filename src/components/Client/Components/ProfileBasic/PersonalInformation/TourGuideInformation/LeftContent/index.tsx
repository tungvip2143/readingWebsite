import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomFields from 'components/CustomFields';
import SelectPrefixPhone from 'components/SelectPrefixPhone';
import { FastField } from 'formik';
import useConstants from 'hooks/useConstants';
import { useTranslations } from 'next-intl';
import React from 'react';

interface LeftContentProps {}

const LeftContent = (props: LeftContentProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const { optionsFemaleOrMale } = useConstants();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <CommonStylesClient.Box>
        <CommonStylesClient.Typography
          variant='h4'
          sx={{
            color: theme.colors?.client.textPaginationBlack,
            fontSize: '0.875rem',
            fontWeight: 700,
            lineHeight: '1.313rem',
            letterSpacing: '0.035rem',
            marginBottom: '0.5rem',
          }}
        >
          {t('Profile.yourName')}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Box sx={{ display: 'flex', gap: 2 }}>
          <CommonStylesClient.Box sx={{ width: '60%' }}>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='firstName'
              placeholder={t('Profile.firstName')}
              fullWidth
            />
          </CommonStylesClient.Box>
          <CommonStylesClient.Box sx={{ width: '40%' }}>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='lastName'
              placeholder={t('Profile.yourName')}
              fullWidth
            />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box>
        <CommonStylesClient.Typography
          variant='h4'
          sx={{
            color: theme.colors?.client.textPaginationBlack,
            fontSize: '0.875rem',
            fontWeight: 700,
            lineHeight: '1.313rem',
            letterSpacing: '0.035rem',
            marginBottom: '0.5rem',
          }}
        >
          {t('Profile.gender')}
        </CommonStylesClient.Typography>

        <FastField
          sizeRadio='small'
          component={CustomFields.RadioField}
          name='gender'
          fullWidth
          values={optionsFemaleOrMale}
          styleFormControl={{ height: '2.5rem' }}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box>
        <CommonStylesClient.Typography
          variant='h4'
          sx={{
            color: theme.colors?.client.textPaginationBlack,
            fontSize: '0.875rem',
            fontWeight: 700,
            lineHeight: '1.313rem',
            letterSpacing: '0.035rem',
            marginBottom: '0.5rem',
          }}
        >
          {t('Profile.dateOfBirth')}
        </CommonStylesClient.Typography>

        <FastField
          size='small'
          type='date'
          component={CustomFields.TextField}
          name='dateOfBirth'
          fullWidth
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box>
        <CommonStylesClient.Typography
          variant='h4'
          sx={{
            color: theme.colors?.client.textPaginationBlack,
            fontSize: '0.875rem',
            fontWeight: 700,
            lineHeight: '1.313rem',
            letterSpacing: '0.035rem',
            marginBottom: '0.5rem',
          }}
        >
          {t('Profile.email')}
        </CommonStylesClient.Typography>

        <FastField
          size='small'
          component={CustomFields.TextField}
          name='email'
          placeholder={t('Profile.enterYourEmail')}
          fullWidth
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box>
        <CommonStylesClient.Typography
          variant='h4'
          sx={{
            color: theme.colors?.client.textPaginationBlack,
            fontSize: '0.875rem',
            fontWeight: 700,
            lineHeight: '1.313rem',
            letterSpacing: '0.035rem',
            marginBottom: '0.5rem',
          }}
        >
          {t('Profile.phone')}
        </CommonStylesClient.Typography>

        <CommonStylesClient.Box sx={{ display: 'flex', gap: 1 }}>
          <CommonStylesClient.Box>
            <SelectPrefixPhone name='phoneCode' />
          </CommonStylesClient.Box>
          <FastField
            size='small'
            component={CustomFields.TextField}
            name='phone'
            placeholder={t('Profile.enterYourPhone')}
            fullWidth
          />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box>
        <CommonStylesClient.Typography
          variant='h4'
          sx={{
            color: theme.colors?.client.textPaginationBlack,
            fontSize: '0.875rem',
            fontWeight: 700,
            lineHeight: '1.313rem',
            letterSpacing: '0.035rem',
            marginBottom: '0.5rem',
          }}
        >
          {t('Profile.cid')}
        </CommonStylesClient.Typography>

        <FastField
          size='small'
          component={CustomFields.TextField}
          name='cid'
          placeholder={t('Profile.enterYourCID')}
          fullWidth
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(LeftContent);
