import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import avatarUser from '../../../../../../public/images/tour1.jpg';
import CommonIconsClient from 'components/Client/CommonIcons';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

interface ProfileSettingProps {}

const ProfileSetting = (props: ProfileSettingProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();

  const menuProfileSetting = [
    {
      icon: <CommonIconsClient.IconProfileUser />,
      label: t('Profile.personalInformation'),
    },
    {
      icon: <CommonIconsClient.IconSecurity />,
      label: t('Profile.loginSecurity'),
    },
    {
      icon: <CommonIconsClient.IconPayment />,
      label: t('Profile.paymentPayouts'),
    },
    {
      icon: <CommonIconsClient.IconNotify />,
      label: t('Profile.notifications'),
    },
    {
      icon: <CommonIconsClient.IconPrivacy />,
      label: t('Profile.privacySharing'),
    },
  ];

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ width: '20%', marginRight: '3rem' }}>
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: '1rem 0',
          marginBottom: '2rem',
        }}
      >
        <CommonStylesClient.Box sx={{ width: '6.25rem', height: '6.25rem', position: 'relative' }}>
          <img
            src={avatarUser.src}
            alt='Avatar User'
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6.25rem' }}
          />

          <CommonStylesClient.Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: '-0.625rem',
              height: '2.5rem',
              padding: '0.469rem 0.5rem',
              backgroundColor: theme.colors?.client.coBaltBlue,
              borderRadius: '1.25rem',
            }}
          >
            <CommonIconsClient.IconCamera />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>

        <CommonStylesClient.Box
          sx={{
            padding: '0.25rem 1rem',
            backgroundColor: theme.colors?.client.pinkBackground,
            borderRadius: '3.125rem',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <CommonStylesClient.Typography
            variant='h4'
            sx={{
              color: theme.colors?.client.red,
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.03rem',
            }}
          >
            {t('Profile.unapprovedAccount')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box>
        <CommonStylesClient.Typography
          variant='h3'
          sx={{
            color: theme.colors?.client.textPaginationBlack,
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.06rem',
            lineHeight: '3.1rem',
            marginBottom: '1rem',
          }}
        >
          {t('Profile.profileSetting')}
        </CommonStylesClient.Typography>

        <CommonStylesClient.Typography
          variant='h4'
          sx={{
            color: theme.colors?.client.darkGray,
            fontSize: '0.875rem',
            fontWeight: 400,
            letterSpacing: '0.018rem',
            lineHeight: '1.4rem',
            marginBottom: '2rem',
          }}
        >
          {t('Profile.describeHowToSettingProfile')}
        </CommonStylesClient.Typography>

        <CommonStylesClient.Box>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {menuProfileSetting.map((elm) => {
              return (
                <li key={elm.label}>
                  <CommonStylesClient.Box
                    sx={{
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      padding: '0.5rem 0',
                      cursor: 'pointer',
                    }}
                  >
                    <CommonStylesClient.Box
                      sx={{ marginLeft: '0.25rem', display: 'flex', alignItems: 'center' }}
                    >
                      {elm.icon}
                    </CommonStylesClient.Box>
                    <CommonStylesClient.Box>
                      <CommonStylesClient.Typography
                        variant='h4'
                        sx={{
                          color: theme.colors?.client.black,
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          letterSpacing: '0.035rem',
                          lineHeight: '1.4rem',
                        }}
                      >
                        {elm.label}
                      </CommonStylesClient.Typography>
                    </CommonStylesClient.Box>
                  </CommonStylesClient.Box>
                </li>
              );
            })}
          </ul>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(ProfileSetting);
