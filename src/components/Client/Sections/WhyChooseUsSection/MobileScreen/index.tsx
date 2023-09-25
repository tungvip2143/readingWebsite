import React from 'react';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import FeatureListMobile from './Components/FeatureListMobile';

interface MoblieWhyChooseUsProps {}

const MoblieWhyChooseUs = (props: MoblieWhyChooseUsProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('WhyChooseUsSession');
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        backgroundColor: theme.colors?.client.white,
        padding: '1.5rem',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: '3rem',
      }}
    >
      <CommonStylesClient.Box>
        <CommonStylesClient.Typography sx={{ marginBottom: '1rem' }} type='pcHeading3'>
          {t('whyChooseUs')}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='text12Regular'>
          {t('findAndBookAGreatExperience')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FeatureListMobile
          iconFeature={<CommonIcons.IconMap />}
          iconEllipse={<CommonIcons.IconEllipseYellow />}
          nameFeature={t('featureBestGuide')}
          introduceFeature={t('introduceBestGuide')}
        />
        <FeatureListMobile
          iconFeature={<CommonIcons.IconSupport />}
          iconEllipse={<CommonIcons.IconEllipseBlue />}
          nameFeature={t('featureSupport24/7')}
          introduceFeature={t('introduceSupport')}
        />
        <FeatureListMobile
          iconEllipse={<CommonIcons.IconEllipseGreen />}
          iconFeature={<CommonIcons.IconBuilding />}
          nameFeature={t('featureLuxuryHotels')}
          introduceFeature={t('introduceLuxuryHotels')}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(MoblieWhyChooseUs);
