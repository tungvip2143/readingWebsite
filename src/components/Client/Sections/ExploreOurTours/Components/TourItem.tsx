import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import Image from 'next/image';
import CommonIcons from 'components/Client/CommonIcons';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Tour } from 'modules/tour/tour.interface';
import { IMG_URL } from 'constants/apiUrls';
import CommonStyles from 'components/CommonStyles';
import Link from 'next/link';
import pageUrls from 'constants/pageUrls';
import { formatPrice } from 'helpers/common';

interface TourItemProps {
  tour: Tour;
}

export default function TourItem(props: TourItemProps) {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const { tour } = props;
  const { id, thumbnail, name = '', Area, defaultPrice, totalRate } = tour;
  const place = Area?.name || 'Viet Nam';
  const rating = totalRate || 0;
  const href = `${pageUrls.Tour}/${id}`;
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        width: '25%',
        ['a']: {
          textDecoration: 'none',
        },
      }}
    >
      <Link href={href}>
        <CommonStylesClient.Box sx={{ width: 288, height: 282, marginBottom: '0.875rem' }}>
          <img
            src={`${IMG_URL}/${thumbnail}`}
            style={{ width: 288, height: 282, borderRadius: '1rem' }}
            alt={`Image ${name}`}
          />
        </CommonStylesClient.Box>

        <CommonStylesClient.Box sx={{ marginBottom: '0.25rem' }}>
          <CommonStyles.Tooltip
            title={name?.length < 20 ? '' : name}
            style={{ padding: 0, margin: 0 }}
          >
            <p>
              <CommonStylesClient.Typography
                type='mobiHeading2'
                sx={{ color: theme.colors?.client.white }}
              >
                {name?.length < 20 ? name : name?.slice(0, 20).concat('...')}
              </CommonStylesClient.Typography>
            </p>
          </CommonStyles.Tooltip>
        </CommonStylesClient.Box>

        <CommonStylesClient.Box sx={{ marginBottom: '1rem' }}>
          <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client.gray }}>
            {place}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>

        <CommonStylesClient.Box
          sx={{
            paddingTop: '1rem',
            borderTop: `1px solid ${theme.colors?.client.darkGray}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CommonStylesClient.Typography
            type='mobiHeading2'
            sx={{ color: theme.colors?.client.white }}
          >
            {formatPrice(Number(defaultPrice))}/{t('TourDetailPage.people')}
          </CommonStylesClient.Typography>

          <CommonStylesClient.Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CommonIcons.IconStar />
            <CommonStylesClient.Box>
              <CommonStylesClient.Typography
                type='title16'
                sx={{ color: theme.colors?.client.lightGray, marginLeft: '0.25rem' }}
              >
                {rating}
              </CommonStylesClient.Typography>
            </CommonStylesClient.Box>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </Link>
    </CommonStylesClient.Box>
  );
}
