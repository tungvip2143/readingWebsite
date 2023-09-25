import { useTheme } from '@mui/material';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import avatarTourDefault from '../../../../../../../public/images/avatarUser.png';
import { useTranslations } from 'next-intl';

interface TourItemProps {
  nameCustomer?: string;
  nameTour?: string;
  destination?: string;
  avatarCustomer?: string;
  price?: string;
  gender?: string;
}

const TourItem = (props: TourItemProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('ReportLocalFiend');

  const { nameCustomer, avatarCustomer, nameTour, destination, price, gender } = props;

  //! Function

  const renderGenderFindTourGuide = (gender: string | undefined) => {
    if (gender && gender === 'MALE') {
      return t('maleFindTourGuide');
    }
    if (gender && gender === 'FEMALE') {
      return t('femaleFindTourGuide');
    }
    return t('otherFindTourGuide');
  };

  //! Render

  return (
    <CommonStylesClient.Box
      sx={{
        padding: '1rem',
        borderRadius: '1rem',
        backgroundColor: theme.colors?.client.white,
        boxShadow: `-0px -2px 10px 0px ${theme.colors?.client.borderGray}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <CommonStylesClient.Box sx={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <img
          src={avatarCustomer ? avatarCustomer : avatarTourDefault.src}
          alt='Avatar Customer'
          style={{
            width: '1.5rem',
            height: '1.5rem',
            objectFit: 'cover',
            borderRadius: '1.5rem',
          }}
        />
        <CommonStylesClient.Typography type='title12'>
          {nameCustomer} {renderGenderFindTourGuide(gender)}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
      <CommonStylesClient.Divider />
      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <CommonStylesClient.Typography type='mobiHeading5'>
            {nameTour}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Box sx={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            <CommonIcons.IconLocationBlue />
            <CommonStylesClient.Typography type='title10'>
              {destination}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
        <CommonStylesClient.Box
          sx={{ display: 'flex', gap: '1.5rem', justifyContent: 'space-between' }}
        >
          <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CommonStylesClient.Typography type='text10'>Total Price</CommonStylesClient.Typography>
            <CommonStylesClient.Typography type='mobiHeading4'>
              {price}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
          <CommonStylesClient.Button
            variant='outlined'
            sx={{
              borderRadius: '0.75rem',
              color: theme.colors?.client.coBaltBlue,
              borderColor: theme.colors?.client.coBaltBlue,
              textTransform: 'none',
            }}
          >
            {t('detail')}
          </CommonStylesClient.Button>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};
export default React.memo(TourItem);
