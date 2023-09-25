import React from 'react';
import { useTranslations } from 'next-intl';
import { FastField } from 'formik';
import { useTheme } from '@mui/material';

import CustomFields from 'components/CustomFields';

interface LastNameFieldProps {}

const LastNameField = (props: LastNameFieldProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <FastField
      variant='standard'
      component={CustomFields.TextField}
      name='lastName'
      sx={{
        borderLeft: `1px solid ${theme.colors?.client?.gray}`,
        paddingLeft: '10px',
        borderRadius: '0 !important',
        '.MuiOutlinedInput-notchedOutline': { border: 0 },
        '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          border: 0,
        },
        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: 0,
        },
      }}
      InputProps={{
        disableUnderline: true,
      }}
      placeholder={t('SignUp.lastNamePlaceholder')}
    />
  );
};

export default React.memo(LastNameField);
