import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import CommonStylesClient from 'components/Client/CommonStylesClient';

interface HeadingTextFormProps {}

const HeadingTextForm = (props: HeadingTextFormProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        marginBottom: '2rem',
      }}
    >
      <CommonStylesClient.Typography
        type='pcHeading3'
        sx={{ color: theme.colors?.client?.grayScale }}
      >
        {t('SignUp.title')}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

export default React.memo(HeadingTextForm);
