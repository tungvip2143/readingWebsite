import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import { useGet } from 'stores/useStore';
import { DetailOfTour } from 'interfaces/common';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import { Tour } from 'modules/tour/tour.interface';
import cachedKeys from 'constants/cachedKeys';

interface ServiceTourDetailContainerProps {}

interface ServiceList {
  serviceList: string[];
  isNotService?: boolean;
}

const ServiceList = (props: ServiceList) => {
  //! State
  const { serviceList, isNotService = false } = props;
  const theme = useTheme();
  const t = useTranslations('TourDetailPage');

  //! Render
  return serviceList.map((item: string, index: number) => {
    return !!item ? (
      <CommonStylesClient.Box
        key={`${item}-${index}`}
        sx={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <CommonStylesClient.Box sx={{ width: '22px' }}>
          {isNotService ? <CommonIcons.IconNotTickCircle /> : <CommonIcons.IconTickCircle />}
        </CommonStylesClient.Box>
        <CommonStylesClient.Typography type='text14' sx={{ color: theme.colors?.client.darkGray }}>
          {item}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    ) : (
      <CommonStylesClient.Box
        key={`${item}-${index}`}
        sx={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', flexDirection: 'row' }}
      >
        <CommonStylesClient.Typography type='text14' sx={{ color: theme.colors?.client.darkGray }}>
          {t('dontHave')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    );
  });
};

const ServiceTourDetailContainer = (props: ServiceTourDetailContainerProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('TourDetailPage');

  const detailOfTourData: Tour = useGet(cachedKeys.detailTour);
  const serviceList = detailOfTourData?.include || [''];
  const notServiceList = detailOfTourData?.exclude || [''];
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', gap: '3rem', justifyContent: 'space-between', marginBottom: '3rem' }}
    >
      {/*  */}
      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '50%' }}
      >
        <CommonStylesClient.Typography
          type='pcHeading4'
          sx={{ color: theme.colors?.client?.black }}
        >
          {t('service')}
        </CommonStylesClient.Typography>

        <ServiceList serviceList={serviceList} />
      </CommonStylesClient.Box>

      {/*  */}
      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '50%' }}
      >
        <CommonStylesClient.Typography
          type='pcHeading4'
          sx={{ color: theme.colors?.client?.black }}
        >
          {t('notService')}
        </CommonStylesClient.Typography>

        <ServiceList serviceList={notServiceList} isNotService />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(ServiceTourDetailContainer);
