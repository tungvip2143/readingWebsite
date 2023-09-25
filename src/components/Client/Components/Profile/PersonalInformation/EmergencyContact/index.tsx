import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';
import CustomFields from 'components/CustomFields';
import { FastField } from 'formik';
import SelectPrefixPhone from 'components/SelectPrefixPhone';

interface EmergencyContactProps {}

const EmergencyContact = (props: EmergencyContactProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ marginBottom: '2rem' }}>
      <CommonStylesClient.Typography
        variant='h4'
        sx={{
          color: theme.colors?.client.textPaginationBlack,
          fontSize: '1rem',
          fontWeight: 700,
          lineHeight: '1.5rem',
          letterSpacing: '0.04rem',
          marginBottom: '1.5rem',
        }}
      >
        {t('Profile.emergencyContact')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box sx={{ display: 'flex', gap: '3rem' }}>
        <CommonStylesClient.Box
          sx={{ display: 'flex', flexDirection: 'column', width: '50%', gap: '2rem' }}
        >
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
              {t('Profile.fullname')}
            </CommonStylesClient.Typography>
            <CommonStylesClient.Box>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='nameEmergency'
                placeholder={t('Profile.fullname')}
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
              {t('Profile.relationship')}
            </CommonStylesClient.Typography>
            <FastField
              size='small'
              component={CustomFields.TextField}
              name='relationship'
              placeholder={t('Profile.enterYourRelationship')}
              fullWidth
            />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>

        <CommonStylesClient.Box
          sx={{ display: 'flex', flexDirection: 'column', width: '50%', gap: '2rem' }}
        >
          <CommonStylesClient.Box>
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
                  <SelectPrefixPhone name='phoneEmergencyCode' />
                </CommonStylesClient.Box>
                <FastField
                  size='small'
                  component={CustomFields.TextField}
                  name='phoneEmergency'
                  placeholder={t('Profile.enterYourPhone')}
                  fullWidth
                />
              </CommonStylesClient.Box>
            </CommonStylesClient.Box>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(EmergencyContact);
