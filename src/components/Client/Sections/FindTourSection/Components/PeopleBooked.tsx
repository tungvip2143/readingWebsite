import React from 'react';
import Image from 'next/image';
import { useTheme } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useTranslations } from 'next-intl';

import avatar1 from '../../../../../../public/images/Client/Avatar/avatar1.jpg';
import avatar2 from '../../../../../../public/images/Client/Avatar/avatar2.jpg';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import useCheckResolution from 'hooks/useCheckResolution';

const PeopleBooked = () => {
  const theme = useTheme();
  const t = useTranslations('FindTour');
  const { isMobile } = useCheckResolution();

  const total = 17;
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'column', lg: 'row' },
        gap: '0.75rem',
      }}
    >
      <AvatarGroup
        total={total}
        sx={{
          ['.MuiAvatar-root']: {
            width: 32,
            height: 32,
            marginLeft: '-0.5rem',
            fontSize: '0.75rem',
            background: theme.colors?.client?.green,
            border: `2px solid ${theme.colors?.client?.white}`,
          },
          justifyContent: 'flex-end',
          alignItems: 'left',
        }}
      >
        <Image
          alt='Remy Sharp'
          width={36}
          height={36}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${theme.colors?.client?.white}`,
          }}
          src={avatar1}
        />
        <Image
          alt='Travis Howard'
          width={36}
          height={36}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            marginLeft: '-0.5rem',
            border: `2px solid ${theme.colors?.client?.white}`,
          }}
          src={avatar2}
        />
      </AvatarGroup>

      <CommonStylesClient.Typography
        type='text12'
        sx={{
          display: 'flex',
          textAlign: { lg: 'center', md: 'left', xs: 'left' },
          alignItems: 'center',
          color: theme.colors?.client?.grayScale,
          letterSpacing: '0.48px',
        }}
      >
        {t('peopleBooked', { number: total, hour: 24 })}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

export default PeopleBooked;
