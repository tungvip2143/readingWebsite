import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';

interface OtherLoginProps {
  onClickGoogle?: () => void;
  onClickFacebook?: () => void;
}

interface RenderButtonOther {
  icon: React.ReactNode;
  onClick?: () => void;
}

const OtherLogin = (props: OtherLoginProps) => {
  //! State
  const { onClickGoogle, onClickFacebook } = props;
  const theme = useTheme();
  const t = useTranslations();
  //! Function

  const RenderButtonOther = ({ icon, onClick }: RenderButtonOther) => {
    return (
      <CommonStylesClient.Button
        sx={{
          boxShadow: 'none',
          width: 150,
          borderRadius: '1rem',
          padding: '17px 34px',
          background: theme.colors?.client.white,
          border: `1px solid ${theme.colors?.client?.midGray}`,
          [':hover']: {
            boxShadow: 'none',
            background: theme.colors?.client.white,
          },
        }}
        onClick={onClick}
      >
        {icon}
      </CommonStylesClient.Button>
    );
  };

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
        alignItems: 'center',
        marginTop: '1.5rem',
      }}
    >
      <CommonStylesClient.Box sx={{ width: '100%' }}>
        <CommonStylesClient.Divider
          sx={{
            [':before,:after']: {
              borderTop: `thin solid #E9EBED`,
            },
          }}
        >
          <CommonStylesClient.Typography
            type='text14'
            sx={{ color: theme.colors?.client?.grayScaleLighter }}
          >
            {t('Login.orLoginWith')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Divider>
      </CommonStylesClient.Box>
      <CommonStylesClient.Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <RenderButtonOther icon={<CommonIcons.IconGmail />} onClick={onClickGoogle} />
        <RenderButtonOther icon={<CommonIcons.IconFacebookBlue />} onClick={onClickFacebook} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(OtherLogin);
