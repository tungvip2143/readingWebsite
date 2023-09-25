import React from 'react';
import { FastField, useFormikContext } from 'formik';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomFields from 'components/CustomFields';
import PrefixNumberPhone from './PrefixNumberPhone';

import IconEndInput from 'components/Client/CommonStylesClient/IconEndInput';
import { Method } from 'constants/common';
import { FormLoginValues } from '..';

interface LoginFormProps {
  loading: boolean;
  onClickForgotPassword: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  //! State
  const { loading, onClickForgotPassword } = props;
  const {
    values: { method },
    setFieldValue,
  } = useFormikContext<FormLoginValues>();
  const t = useTranslations();
  const theme = useTheme();

  const onToggleMethod = (nextMethod: Method) => {
    setFieldValue('method', nextMethod);

    if (nextMethod === Method.PHONE) {
      setFieldValue('email', '');
    }

    if (nextMethod === Method.EMAIL) {
      setFieldValue('phoneNumber', '');
    }
  };

  //! Function
  const renderFormLogin = () => {
    if (method === Method.PHONE) {
      return (
        <CommonStylesClient.Box
          sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
        >
          <CommonStylesClient.Typography type='mobiHeading4'>
            {t('Login.phoneNumber')}
          </CommonStylesClient.Typography>
          <FastField
            component={CustomFields.TextField}
            name='phoneNumber'
            placeholder={t('Login.phoneNumberPlaceholder')}
            sx={{
              '.icon-start-input': { width: 52, marginRight: '2.125rem' },
              '.select-field': {
                width: 54,
                minWidth: 54,
              },
            }}
            iconStartInput={<PrefixNumberPhone />}
            iconEndInput={<IconEndInput initialMethod={method} onClickIcon={onToggleMethod} />}
          />
        </CommonStylesClient.Box>
      );
    }
    return (
      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('Login.email')}
        </CommonStylesClient.Typography>
        <FastField
          component={CustomFields.TextField}
          name='email'
          placeholder={t('Login.emailPlaceholder')}
          sx={{
            '.select-field': {
              width: 54,
              minWidth: 54,
            },
          }}
          iconEndInput={<IconEndInput initialMethod={method} onClickIcon={onToggleMethod} />}
          sxEndAdornment={{ marginLeft: '0.8rem' }}
        />
      </CommonStylesClient.Box>
    );
  };
  //! Effect

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
      {renderFormLogin()}

      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('Login.password')}
        </CommonStylesClient.Typography>

        <FastField
          component={CustomFields.TextField}
          type='password'
          name='password'
          placeholder={t('Login.passwordPlaceholder')}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FastField
          name='saveLogin'
          component={CustomFields.CheckBoxField}
          label={t('Login.saveLogin')}
          sxLabel={{
            fontSize: '0.75rem',
            color: theme.colors?.client?.black,
            fontWeight: 500,
            lineHeight: 'normal',
          }}
          sxContainer={{
            gap: '4px',
            '.Mui-checked': {
              color: `${theme.colors?.client?.coBaltBlue} !important`,
            },
          }}
        />

        <CommonStylesClient.Typography
          type='mobiHeading5'
          sx={{ color: theme.colors?.client?.coBaltBlue, cursor: 'pointer' }}
          onClick={onClickForgotPassword}
        >
          {t('Login.forgotPassword')}
        </CommonStylesClient.Typography>
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
          {t('Login.submit')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Button>
    </CommonStylesClient.Box>
  );
};

export default React.memo(LoginForm);
