import React from 'react';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { IMG_URL } from 'constants/apiUrls';
import CommonIcons from 'components/Client/CommonIcons';
import { useTranslations } from 'next-intl';

interface TourGuideInformationProps {
  avatar: string;
  name: string;
  email: string;
  rate: number | string;
  handleChangeTourGuide?: () => void;
  readOnly?: boolean;
}

const TourGuideInformation = (props: TourGuideInformationProps) => {
  //! State
  const {
    avatar,
    name = '',
    email = '',
    rate = 0,
    handleChangeTourGuide,
    readOnly = false,
  } = props;
  const t = useTranslations('PaymentPage');
  const theme = useTheme();
  const avatarSrc = `${IMG_URL}/${avatar}`;
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <CommonStylesClient.Typography type='pcHeading4'>
        {t('Articles')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CommonStylesClient.Box
          sx={{
            img: {
              width: 150,
              height: 150,
              objectFit: 'cover',
              borderRadius: '1rem',
            },
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '1rem',
            height: '100%',
          }}
        >
          <img src={avatarSrc} alt='avatar' />
          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              height: 150,
            }}
          >
            <CommonStylesClient.Typography
              type='pcHeading4'
              sx={{ color: theme.colors?.client?.black }}
            >
              {name}
            </CommonStylesClient.Typography>

            <CommonStylesClient.Typography
              type='text16'
              sx={{
                color: theme.colors?.client?.darkGray,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <CommonIcons.IconMessage /> {email}
            </CommonStylesClient.Typography>

            <CommonStylesClient.Box
              sx={{ display: 'flex', gap: '0.2rem', alignItems: 'baseline', width: 45 }}
            >
              <CommonStylesClient.Box sx={{ position: 'relative', top: '2px' }}>
                <CommonIcons.IconStar />
              </CommonStylesClient.Box>

              <CommonStylesClient.Typography
                type='title14'
                sx={{ color: theme.colors?.client.darkGray }}
              >
                {rate}
              </CommonStylesClient.Typography>
            </CommonStylesClient.Box>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
        {/*  */}
        {!readOnly && (
          <CommonStylesClient.Box>
            <CommonStylesClient.Typography
              type='pcHeading4'
              onClick={handleChangeTourGuide}
              sx={{ color: theme.colors?.client?.coBaltBlue, cursor: 'pointer' }}
            >
              {t('changeButton')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        )}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(TourGuideInformation);
