import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import CommonStylesClient from 'components/Client/CommonStylesClient';

interface JourneyHeadingProps {}

const JourneyHeading = (props: JourneyHeadingProps) => {
  //! State
  const theme = useTheme();
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
      <CommonStylesClient.Typography type='pcHeading2'>
        {t('heading')}
      </CommonStylesClient.Typography>
      <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client?.darkGray }}>
        {t('subHeading')}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

export default React.memo(JourneyHeading);
