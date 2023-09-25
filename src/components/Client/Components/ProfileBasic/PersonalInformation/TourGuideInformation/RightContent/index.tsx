import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import SelectProvince from 'components/SelectProvince';
import { FastField, useFormikContext } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FormVerifyProfileBasic } from '../..';
import { fileToString } from 'helpers/common';

interface RightContentProps {}

const RightContent = (props: RightContentProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();

  const { values, setFieldTouched, touched, errors } = useFormikContext<FormVerifyProfileUser>();

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
          {t('Index.location')}
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
      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            {t('Profile.portrait')}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Typography
            variant='h4'
            sx={{
              color: theme.colors?.client.textPaginationBlack,
              fontSize: '0.75rem',
              fontWeight: 400,
              lineHeight: '1.2rem',
              letterSpacing: '0.03rem',
              height: '2.4rem',
            }}
          >
            {t('Profile.actualPortraitAtTheTimeOfRegistration')}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Box>
            <FastField
              component={CommonStyles.PlaceholderUploadImage}
              name='avatar'
              fullWidth
              isHasDelete
              renderChildren={
                !!values?.avatar && (
                  <CommonStyles.Box sx={{ width: '100%', maxWidth: '15rem' }}>
                    <img
                      style={{ width: '100%' }}
                      alt='avatar-placeholder'
                      src={fileToString(values?.avatar || '')}
                    />
                  </CommonStyles.Box>
                )
              }
            />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(RightContent);
