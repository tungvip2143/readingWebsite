import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/CommonIcons';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import { useTranslations } from 'next-intl';
import React from 'react';
import ReactPlayer from 'react-player';

import { IMG_URL } from 'constants/apiUrls';
const BooknowVideo = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  //!Fuction
  const renderPlayerVideo = () => {
    return (
      <ReactPlayer
        url='https://youtube.com/watch?v=2RGu_tLeqk4'
        playIcon={
          <CommonStylesClient.Button
            isIconButton
            sx={{
              display: 'inline-flex',
              padding: '24px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '48px',
              background: 'rgba(252, 252, 253, 0.08)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CommonIcons.PlayVideo />
          </CommonStylesClient.Button>
        }
        width='100%'
        height='41.125rem'
        playing
        // light={`${IMG_URL}/uploads/2023/8/3/image-54-15462209082023902520.jpeg`}
        light={'https://i.upanh.org/2023/08/10/image-545539068d9be2c6a8.jpeg'}
      />
    );
  };

  const renderPromotion = () => {
    return (
      <CommonStylesClient.Box
        sx={{
          position: 'absolute',
          bottom: 0,
          maxHeight: '8.5rem',
          height: '100%',
          padding: '2.5rem 7.5rem',
          width: '100%',
          background: 'linear-gradient(180deg, rgba(252, 252, 253, 0.00) 0%, #FCFCFD 100%)',
          backdropFilter: 'blur(8px)',
          [theme.breakpoints.down('lg')]: {
            padding: '3rem 7.5rem',
            alignItems: 'center',
          },
        }}
      >
        <div
          style={{
            margin: 'auto',
            maxWidth: MAX_WIDTH_CONTAINER,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <CommonStylesClient.Typography type='large36'>
            Save up to <span style={{ color: theme.colors?.client.coBaltBlue }}>40%</span> off your!
          </CommonStylesClient.Typography>
          <CommonStylesClient.Button
            sx={{
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '16px',
              maxWidth: '10.5rem',
              width: '100%',
              background: theme.colors?.client.coBaltBlue,
              textTransform: 'capitalize',
              fontWeight: 600,
            }}
          >
            {t('Marketing.bookNow')}
          </CommonStylesClient.Button>
        </div>
      </CommonStylesClient.Box>
    );
  };
  //!Render
  return (
    <CommonStylesClient.Box style={{ width: '100%', position: 'relative' }}>
      {renderPlayerVideo()}
      {renderPromotion()}
    </CommonStylesClient.Box>
  );
};

export default BooknowVideo;
