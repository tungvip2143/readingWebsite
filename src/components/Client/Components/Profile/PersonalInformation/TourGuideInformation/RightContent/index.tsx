import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomFields from 'components/CustomFields';
import SelectProvince from 'components/SelectProvince';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';

interface RightContentProps {}

const RightContent = (props: RightContentProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();

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
          {t('Profile.bio')}
        </CommonStylesClient.Typography>
        <FastField
          name='bio'
          component={CustomFields.Textarea}
          placeholder={t('Profile.enterYourBio')}
          size='small'
          sx={{
            height: '4rem',
          }}
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
          {t('Profile.tourDestination')}
        </CommonStylesClient.Typography>
        <SelectProvince name='provinceCity' isMultiple />
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
          {t('Profile.residenceByPermanentAddress')}
        </CommonStylesClient.Typography>

        <FastField
          size='small'
          component={CustomFields.Textarea}
          sx={{
            height: '4rem',
          }}
          fullWidth
          placeholder={t('Profile.enterYourHomeAddress')}
          name='residenceAccordingToPermanentAddress'
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
          {t('Profile.currentResidence')}
        </CommonStylesClient.Typography>

        <FastField
          size='small'
          component={CustomFields.Textarea}
          sx={{
            height: '4rem',
          }}
          fullWidth
          placeholder={t('Profile.enterYourHomeAddress')}
          name='currentResidence'
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(RightContent);
