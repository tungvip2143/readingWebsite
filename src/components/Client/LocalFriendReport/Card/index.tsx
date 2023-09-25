import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import RevenueCard from './RevenueCard/RevenueCard';
import BookCard from './BookCard/BookCard';
import CompleteCard from './CompleteCard/CompleteCard';
import { useTranslations } from 'next-intl';

const LocalFriendCard = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations('ReportLocalFiend');
  //! Function

  //! Render

  return (
    <CommonStylesClient.Box
      sx={{
        backgroundColor: theme.colors?.client.white,
        padding: '1.75rem 2.5rem',
        display: 'flex',
        gap: '5.5rem',
        borderRadius: '1rem',
      }}
    >
      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <CommonStylesClient.Typography type='pcHeading3'>
          {t('hello')} Trâm!
        </CommonStylesClient.Typography>
        <CommonStylesClient.Box>
          <CommonStylesClient.Typography type='title14'>{t('title')}</CommonStylesClient.Typography>
          <CommonStylesClient.Box sx={{ display: 'flex', gap: 0.5 }}>
            <CommonStylesClient.Typography
              type='pcHeading4'
              sx={{ color: theme?.colors?.client.coBaltBlue }}
            >
              GOTO
            </CommonStylesClient.Typography>
            <CommonStylesClient.Typography
              type='pcHeading4'
              sx={{ color: theme.colors?.client.blue }}
            >
              CMS.
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
      <CommonStylesClient.Box sx={{ display: 'flex', gap: '1rem' }}>
        <RevenueCard />
        <BookCard />
        <CompleteCard />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};
export default React.memo(LocalFriendCard);
