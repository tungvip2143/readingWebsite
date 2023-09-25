import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import CommonStylesClient from 'components/Client/CommonStylesClient';

interface DontHaveAccountTextProps {
  onClickLoginText: () => void;
}

const DontHaveAccountText = (props: DontHaveAccountTextProps) => {
  //! State
  const { onClickLoginText } = props;
  const theme = useTheme();
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: '2px',
        margin: '1.5rem 0',
      }}
    >
      <CommonStylesClient.Typography type='text14' sx={{ color: theme.colors?.client.midBlack }}>
        {t('Login.dontHaveAccount')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Typography
        type='title14'
        sx={{ color: theme.colors?.client.coBaltBlue, cursor: 'pointer' }}
        onClick={onClickLoginText}
      >
        {t('SignUp.title')}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

export default React.memo(DontHaveAccountText);
