import React from 'react';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface HeadingListProps {
  label: string;
  href?: string;
  allNumber: number;
  hiddenShowAll?: boolean;
}

const HeadingList = (props: HeadingListProps) => {
  //! State
  const { label, href = '', allNumber = 0, hiddenShowAll = false } = props;
  const theme = useTheme();
  const t = useTranslations('TourPage');

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ['a']: {
          textDecoration: 'none',
          [':hover']: {
            textDecoration: 'underline',
          },
        },
      }}
    >
      <CommonStylesClient.Typography
        type='mobiHeading1'
        sx={{ color: theme?.colors?.client?.black }}
      >
        {!hiddenShowAll ? label : `${label} (${allNumber})`}
      </CommonStylesClient.Typography>
      {!hiddenShowAll && (
        <Link href={href}>
          <CommonStylesClient.Typography
            type='mobiHeading4'
            sx={{ color: theme.colors?.client?.coBaltBlue }}
          >
            {t('all', { number: allNumber })}
          </CommonStylesClient.Typography>
        </Link>
      )}
    </CommonStylesClient.Box>
  );
};

export default React.memo(HeadingList);
