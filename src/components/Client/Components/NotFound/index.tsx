import React from 'react';
import { SxProps, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import Link from 'next/link';
import pageUrls from 'constants/pageUrls';

interface NotFoundProps {
  title?: string;
  subTitle?: string;
  hiddenSubtitle?: boolean;
  labelButton?: string;
  href?: string;
  sx?: SxProps;
}

const NotFound = (props: NotFoundProps) => {
  //! State
  const {
    title = '',
    subTitle = '',
    hiddenSubtitle = false,
    labelButton = '',
    href = '',
    sx,
  } = props;
  const theme = useTheme();
  const t = useTranslations('Index');
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        width: '100vw',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        gap: '2rem',
        padding: '3rem',
        ['a']: {
          color: theme.colors?.client?.white,
          textDecoration: 'none',
        },
        ...sx,
      }}
    >
      <CommonIcons.NotFound />
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <CommonStylesClient.Typography
          type='mobiHeading3'
          sx={{ color: theme.colors?.client?.black }}
        >
          {title ? title : t('notFoundTitle')}
        </CommonStylesClient.Typography>
        {!hiddenSubtitle && (
          <CommonStylesClient.Typography
            type='text14'
            sx={{ color: theme.colors?.client?.darkGray }}
          >
            {subTitle ? subTitle : t('notFoundSubtitle')}
          </CommonStylesClient.Typography>
        )}

        <Link href={href ? href : pageUrls.Homepage}>
          <CommonStylesClient.Button
            sx={{
              background: theme.colors?.client?.coBaltBlue,
              width: 250,
              borderRadius: '1rem',
              margin: '0 auto',
            }}
          >
            {labelButton ? labelButton : t('notFoundLabelButton')}
          </CommonStylesClient.Button>
        </Link>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(NotFound);
