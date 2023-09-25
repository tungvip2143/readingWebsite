import { useTheme } from '@mui/material';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import TourItem from './components/TourItem';
import { useTranslations } from 'next-intl';

const ListTour = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations('ReportLocalFiend');

  const dataListTour = [
    {
      id: 1,
      nameCustomer: 'Thao',
      avatarCustomer: undefined,
      nameTour: 'Tour vòng quanh thế giới',
      destination: 'Nội Bài, Hà Nội',
      price: '12.000.000',
      gender: 'MALE',
    },
    {
      id: 2,
      nameCustomer: 'Thái',
      avatarCustomer: undefined,
      nameTour: 'Tour vòng quanh hà nội',
      destination: 'Nội Bài, Hà Nội',
      price: '10.000.000',
      gender: 'FEMALE',
    },
    {
      id: 3,
      nameCustomer: 'Trung',
      avatarCustomer: undefined,
      nameTour: 'Tour vòng quanh cầu giấy',
      destination: 'Nội Bài, Hà Nội',
      price: '11.000.000',
      gender: 'OTHER',
    },
    {
      id: 4,
      nameCustomer: 'Thắng',
      avatarCustomer: undefined,
      nameTour: 'Tour vòng quanh thế giới',
      destination: 'Nội Bài, Hà Nội',
      price: '2.000.000',
      gender: 'MALE',
    },
  ];
  //! Function

  //! Render

  return (
    <CommonStylesClient.Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        overflow: 'auto',
        maxHeight: '800px',
      }}
    >
      <CommonStylesClient.Box sx={{ padding: '2rem 2.5rem' }}>
        <CommonStylesClient.Typography type='mobiHeading4'>
          {t('recentlyUpdated')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
      <CommonStylesClient.Box
        sx={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        {dataListTour.map((item, index) => {
          return (
            <TourItem
              key={item.id}
              nameCustomer={item.nameCustomer}
              destination={item.destination}
              avatarCustomer={item.avatarCustomer}
              nameTour={item.nameTour}
              price={item.price}
              gender={item.gender}
            />
          );
        })}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};
export default React.memo(ListTour);
