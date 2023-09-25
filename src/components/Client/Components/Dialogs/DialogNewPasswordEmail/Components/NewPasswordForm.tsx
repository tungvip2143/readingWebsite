import React from 'react';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';

import CustomFields from 'components/CustomFields';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import PrefixNumberPhone from '../../DialogLogin/Components/PrefixNumberPhone';

interface NewPasswordFormProps {
  loading: boolean;
}

const NewPasswordForm = (props: NewPasswordFormProps) => {
  //! State
  const { loading } = props;
  const theme = useTheme();
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('ForgotPassword.email')}
        </CommonStylesClient.Typography>
        <FastField
          component={CustomFields.TextField}
          name='email'
          placeholder={t('ForgotPassword.emailPlaceholder')}
          disabled
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('ForgotPassword.password')}
        </CommonStylesClient.Typography>

        <FastField
          component={CustomFields.TextField}
          type='password'
          name='password'
          placeholder={t('ForgotPassword.passwordPlaceholder')}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('ForgotPassword.rePassword')}
        </CommonStylesClient.Typography>

        <FastField
          component={CustomFields.TextField}
          type='password'
          name='confirmPassword'
          placeholder={t('ForgotPassword.rePasswordPlaceholder')}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Button
        sx={{
          background: theme.colors?.client?.coBaltBlue,
          width: '100%',
          borderRadius: '1rem',
          padding: '1rem 5.4375rem',
          textTransform: 'capitalize',
          letterSpacing: '0.64px',
        }}
        type='submit'
        loading={loading}
      >
        <CommonStylesClient.Typography
          type='mobiHeading3'
          sx={{ color: theme.colors?.client?.white }}
        >
          {t('ForgotPassword.changePassword')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Button>
    </CommonStylesClient.Box>
  );
};

export default React.memo(NewPasswordForm);
