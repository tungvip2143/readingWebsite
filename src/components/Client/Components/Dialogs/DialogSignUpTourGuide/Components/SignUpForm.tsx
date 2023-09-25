import React from 'react';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import CustomFields from 'components/CustomFields';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import PrefixNumberPhone from '../../DialogLogin/Components/PrefixNumberPhone';
import useConstants from 'hooks/useConstants';
// import PrefixNumberPhone from './PrefixNumberPhone';

interface SignUpFormProps {
  loading: boolean;
}

const SignUpForm = (props: SignUpFormProps) => {
  //! State
  const { loading } = props;
  const { optionsGender } = useConstants();
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
          {t('SignUp.firstNamePlaceholder')}
        </CommonStylesClient.Typography>
        <FastField
          component={CustomFields.TextField}
          name='firstName'
          placeholder={t('SignUp.firstNamePlaceholder')}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('SignUp.lastNamePlaceholder')}
        </CommonStylesClient.Typography>
        <FastField
          component={CustomFields.TextField}
          name='lastName'
          placeholder={t('SignUp.lastNamePlaceholder')}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('SignUp.gender')}
        </CommonStylesClient.Typography>
        <FastField
          sizeRadio='small'
          component={CustomFields.RadioField}
          name='gender'
          fullWidth
          values={optionsGender}
          styleFormControl={{ height: '2.5rem' }}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('SignUp.phoneNumber')}
        </CommonStylesClient.Typography>
        <FastField
          component={CustomFields.TextField}
          name='phoneNumber'
          placeholder={t('SignUp.phoneNumberPlaceholder')}
          sx={{
            '.MuiInputAdornment-root': { width: 52, marginRight: '2.125rem' },
            '.select-field': {
              width: 54,
              minWidth: 54,
            },
          }}
          iconStartInput={<PrefixNumberPhone />}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('SignUp.email')}
        </CommonStylesClient.Typography>
        <FastField
          component={CustomFields.TextField}
          name='email'
          placeholder={t('SignUp.emailPlaceholder')}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('SignUp.password')}
        </CommonStylesClient.Typography>

        <FastField
          component={CustomFields.TextField}
          type='password'
          name='password'
          placeholder={t('SignUp.passwordPlaceholder')}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('SignUp.rePassword')}
        </CommonStylesClient.Typography>

        <FastField
          component={CustomFields.TextField}
          type='password'
          name='confirmPassword'
          placeholder={t('SignUp.rePasswordPlaceholder')}
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
          name='acceptTerm'
          component={CustomFields.CheckBoxField}
          label={t('SignUp.termsOfSignUp')}
          sxLabel={{
            fontSize: '0.75rem',
            color: theme.colors?.client?.black,
            fontWeight: 500,
            lineHeight: 'normal',
            cursor: 'pointer',
          }}
          sxContainer={{
            gap: '4px',
            '.Mui-checked': {
              color: `${theme.colors?.client?.coBaltBlue} !important`,
            },
          }}
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
          {t('SignUp.submit')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Button>
    </CommonStylesClient.Box>
  );
};

export default React.memo(SignUpForm);
