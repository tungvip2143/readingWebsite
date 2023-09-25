import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import FeatureList from 'components/Client/Sections/WhyChooseUsSection/Components/FeatureList';
import CommonIcons from 'components/Client/CommonIcons';
import useCheckResolution from 'hooks/useCheckResolution';
import MobileWhyChooseUs from './MobileScreen';

interface WhyChooseUsSessionProps {}

const WhyChooseUsSession = (props: WhyChooseUsSessionProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('WhyChooseUsSession');
  const { isMobile } = useCheckResolution();
  //! Function

  //! Render
  if (isMobile) {
    return <MobileWhyChooseUs />;
  }

  return (
    <CommonStylesClient.Box
      sx={{
        backgroundColor: theme.colors?.client.white,
        padding: '7.5rem 13rem',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <CommonStylesClient.Box sx={{ marginBottom: '3rem' }}>
        <CommonStylesClient.Typography sx={{ marginBottom: '1rem' }} type='pcHeading2'>
          {t('whyChooseUs')}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='text16Regular'>
          {t('findAndBookAGreatExperience')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
      <CommonStylesClient.Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '75rem',
          }}
        >
          <FeatureList
            iconFeature={<CommonIcons.IconMap />}
            iconEllipse={<CommonIcons.IconEllipseYellow />}
            nameFeature={t('featureBestGuide')}
            introduceFeature={t('introduceBestGuide')}
          />
          <FeatureList
            iconFeature={<CommonIcons.IconSupport />}
            iconEllipse={<CommonIcons.IconEllipseBlue />}
            nameFeature={t('featureSupport24/7')}
            introduceFeature={t('introduceSupport')}
          />
          <FeatureList
            iconEllipse={<CommonIcons.IconEllipseGreen />}
            iconFeature={<CommonIcons.IconBuilding />}
            nameFeature={t('featureLuxuryHotels')}
            introduceFeature={t('introduceLuxuryHotels')}
          />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(WhyChooseUsSession);
