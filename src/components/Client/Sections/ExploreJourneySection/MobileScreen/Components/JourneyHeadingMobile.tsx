import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import React from 'react';

interface JourneyHeadingMobileProps {}

const JourneyHeadingMobile = (props: JourneyHeadingMobileProps) => {
  //! State
  const t = useTranslations('ExploreJourney');

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '0.876rem',
        maxWidth: 632,
        width: '100%',
        margin: 'auto',
      }}
    >
      <CommonStylesClient.Typography type='mobiHeading2'>
        {t('heading')}
      </CommonStylesClient.Typography>
      <CommonStylesClient.Typography type='text16'>{t('subHeading')}</CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

export default React.memo(JourneyHeadingMobile);
