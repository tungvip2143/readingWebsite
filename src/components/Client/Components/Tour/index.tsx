import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import Link from 'next/link';
import pageUrls from 'constants/pageUrls';
import CommonStyles from 'components/CommonStyles';
import { formatPrice } from 'helpers/common';

interface ItemProps {
  id?: number;
  image: string;
  name: string;
  place: string;
  price: number;
  rating: number;
  href: string;
}

export default function Item(props: ItemProps) {
  //! State
  const { image, name, place, price, rating, href } = props;
  const theme = useTheme();
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        borderRadius: '1rem',
        ['a']: {
          textDecoration: 'none',
        },
      }}
    >
      <Link href={href}>
        <CommonStylesClient.Box sx={{ width: 288, height: 282, marginBottom: '1rem' }}>
          <img
            src={image}
            style={{ width: '100%', height: '100%', borderRadius: '1rem', objectFit: 'cover' }}
            alt={`Image ${place}`}
          />
        </CommonStylesClient.Box>

        <CommonStylesClient.Box
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 1rem 1.5rem' }}
        >
          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              justifyContent: 'flex-start',
              textAlign: 'left',
            }}
          >
            <CommonStyles.Tooltip
              title={name?.length < 15 ? '' : name}
              style={{ padding: 0, margin: 0 }}
            >
              <p>
                <CommonStylesClient.Typography
                  type='mobiHeading2'
                  sx={{ color: theme.colors?.client.midBlack }}
                >
                  {name?.length < 15 ? name : name?.slice(0, 15).concat('...')}
                </CommonStylesClient.Typography>
              </p>
            </CommonStyles.Tooltip>
            <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client.gray }}>
              {place}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>

          <CommonStylesClient.Box
            sx={{
              paddingTop: '1rem',
              borderTop: `1px solid ${theme.colors?.client.midGray}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CommonStylesClient.Typography
              type='mobiHeading2'
              sx={{ color: theme.colors?.client.midBlack }}
            >
              {`${formatPrice(Number(price))}`}/{t('TourDetailPage.people')}
            </CommonStylesClient.Typography>

            <CommonStylesClient.Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CommonIcons.IconStar />
              <CommonStylesClient.Box>
                <CommonStylesClient.Typography
                  type='title16'
                  sx={{ color: theme.colors?.client.midBlack, marginLeft: '0.25rem' }}
                >
                  {rating}
                </CommonStylesClient.Typography>
              </CommonStylesClient.Box>
            </CommonStylesClient.Box>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </Link>
    </CommonStylesClient.Box>
  );
}
