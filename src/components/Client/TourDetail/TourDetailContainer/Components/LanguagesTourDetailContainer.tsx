import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import { useGet } from 'stores/useStore';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import { Language } from 'constants/common';
import { Tour } from 'modules/tour/tour.interface';
import cachedKeys from 'constants/cachedKeys';

interface LanguagesTourDetailContainerProps {}

const LanguagesTourDetailContainer = (props: LanguagesTourDetailContainerProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('TourDetailPage');
  const detailOfTourData: Tour = useGet(cachedKeys.detailTour);
  //! Function
  const languagesData = detailOfTourData?.language || [];
  const renderFragLanguageIcon = (type: string) => {
    switch (type) {
      case Language.VIETNAMESE:
        return <CommonIcons.IconFragVietNam />;
      case Language.KOREAN:
        return <CommonIcons.IconFragKorean />;
      case Language.ENGLISH:
        return <CommonIcons.IconFragEngland />;
      case Language.JAPAN:
        return <CommonIcons.IconFragJapan />;

      case Language.CHINA:
        return <CommonIcons.IconFragChina />;

      default:
        break;
    }
  };
  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        marginBottom: '2.5rem',
        gap: '1rem',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <CommonStylesClient.Typography type='pcHeading4' sx={{ color: theme.colors?.client?.black }}>
        {t('language')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box
        sx={{ display: 'flex', gap: '2rem', flexDirection: 'row', alignItems: 'center' }}
      >
        {languagesData.map((item) => {
          return renderFragLanguageIcon(item.toString());
        })}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(LanguagesTourDetailContainer);
