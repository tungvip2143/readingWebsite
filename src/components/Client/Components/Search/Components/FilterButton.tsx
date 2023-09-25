import React from 'react';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import { useTranslations } from 'next-intl';

interface FilterButtonProps {}

const FilterButton = (props: FilterButtonProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('TourPage');

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        height: 48,
        background: theme.colors?.client.lightGray,
        textAlign: 'center',
        borderRadius: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid #E9EBED`,
        gap: '0.5rem',
      }}
    >
      <CommonStylesClient.Typography type='title14' sx={{ color: theme.colors?.client.midBlack }}>
        {t('filters')}
      </CommonStylesClient.Typography>
      <CommonIcons.IconFilterBlack />
    </CommonStylesClient.Box>
  );
};

export default React.memo(FilterButton);
