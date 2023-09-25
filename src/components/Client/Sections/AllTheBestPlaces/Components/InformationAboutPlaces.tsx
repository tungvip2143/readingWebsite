import { useTheme } from '@mui/material';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function InformationAboutPlaces() {
  //! State
  const t = useTranslations();
  const theme = useTheme();

  //! Function

  const renderTitle = () => {
    return (
      <CommonStylesClient.Box sx={{ marginBottom: '1rem', letterSpacing: '0.06rem' }}>
        <CommonStylesClient.Typography type='pcHeading2'>
          {t('AllTheBestPlaces.title')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    );
  };

  const renderDescription = () => {
    return (
      <CommonStylesClient.Box sx={{ marginBottom: '2.5rem' }}>
        <CommonStylesClient.Typography
          type='normal'
          sx={{ letterSpacing: '0.02rem', lineHeight: '1.6rem' }}
        >
          {t('AllTheBestPlaces.description')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    );
  };

  const renderActualData = () => {
    return (
      <CommonStylesClient.Box sx={{ display: 'flex' }}>
        <CommonStylesClient.Box sx={{ display: 'flex', alignItems: 'center', marginRight: '2rem' }}>
          <CommonStylesClient.Box sx={{ display: 'flex' }}>
            <CommonIcons.IconCloseCircle />
            <CommonStylesClient.Typography
              type='mobiHeading1'
              sx={{ margin: '0 0.75rem 0 0.5rem', color: theme.colors?.client.grayScale }}
            >
              12K
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>

          <CommonStylesClient.Box>
            <CommonStylesClient.Typography
              type='text14Regular'
              sx={{ color: theme.colors?.client.grayScaleLighter, maxWidth: '5rem' }}
            >
              {t('AllTheBestPlaces.successfullTrips')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>

        <CommonStylesClient.Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CommonStylesClient.Box sx={{ display: 'flex' }}>
            <CommonIcons.IconHappyEmoji />
            <CommonStylesClient.Typography
              type='mobiHeading1'
              sx={{ margin: '0 0.75rem 0 0.5rem', color: theme.colors?.client.grayScale }}
            >
              95%
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>

          <CommonStylesClient.Box sx={{ marginRight: '2rem' }}>
            <CommonStylesClient.Typography
              type='text14Regular'
              sx={{ color: theme.colors?.client.grayScaleLighter, maxWidth: '5rem' }}
            >
              {t('AllTheBestPlaces.happyCustomers')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    );
  };

  //! Render
  return (
    <CommonStylesClient.Box sx={{ padding: '1rem 0' }}>
      <CommonStylesClient.Box sx={{ marginBottom: '1rem' }}>
        <CommonStylesClient.TypographyWithLine label={t('AllTheBestPlaces.travelIsYourFriend')} />
      </CommonStylesClient.Box>

      {renderTitle()}

      {renderDescription()}

      {renderActualData()}
    </CommonStylesClient.Box>
  );
}
