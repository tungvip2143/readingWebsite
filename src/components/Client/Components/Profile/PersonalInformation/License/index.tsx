import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomFields from 'components/CustomFields';
import { ArrayHelpers, FastField, FieldArray, useFormikContext } from 'formik';
import useConstants from 'hooks/useConstants';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FormVerifyProfile } from '..';
import CommonStyles from 'components/CommonStyles';
import { fileToString } from 'helpers/common';
import { isString } from 'lodash';
import CommonIconsClient from 'components/Client/CommonIcons';
import { IMG_URL } from 'constants/apiUrls';

interface LicenseProps {}

const License = (props: LicenseProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const { optionsYesOrNo } = useConstants();
  const { values, setFieldTouched, touched, errors } = useFormikContext<FormVerifyProfile>();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: '3rem', marginBottom: '2rem' }}>
      <CommonStylesClient.Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
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
            {t('Profile.license')}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Typography
            variant='h4'
            sx={{
              color: theme.colors?.client.textPaginationBlack,
              fontSize: '0.75rem',
              fontWeight: 400,
              lineHeight: '1.2rem',
              letterSpacing: '0.03rem',
              marginBottom: '1rem',
            }}
          >
            {t('Profile.localFriendLicenseIssuedByTheAssociationOfLocalFriends')}
          </CommonStylesClient.Typography>

          <CommonStylesClient.Box>
            <FastField
              component={CustomFields.RadioField}
              name='checkLicense'
              fullWidth
              values={optionsYesOrNo}
              styleFormControl={{
                '& div': { display: 'flex', flexDirection: 'column' },
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  lineHeight: '1.4rem',
                  letterSpacing: '0.035rem',
                  color: theme.colors?.client.midBlack,
                },
              }}
            />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
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

export default React.memo(License);
