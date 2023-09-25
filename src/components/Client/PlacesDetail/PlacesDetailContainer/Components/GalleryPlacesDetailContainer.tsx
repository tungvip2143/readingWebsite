import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { DetailOfPlaces, Media } from 'interfaces/common';
import { useGet } from 'stores/useStore';
import { Vendor } from 'modules/vendor/vendor.interface';
import { IMG_URL } from 'constants/apiUrls';
import cachedKeys from 'constants/cachedKeys';

interface GalleryPlacesDetailProps {}

const GalleryPlacesDetail = (props: GalleryPlacesDetailProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('PlacesDetail');
  const detailOfPlaces: Vendor = useGet(cachedKeys.detailPlaces);

  const gallery = detailOfPlaces?.Gallery?.[0].Media || [];
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        marginBottom: '3rem',
        gap: '1rem',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <CommonStylesClient.Box
        sx={{ display: 'flex', gap: '0.5rem', flexDirection: 'row', alignItems: 'center' }}
      >
        <CommonStylesClient.Typography
          type='pcHeading4'
          sx={{ color: theme.colors?.client?.black }}
        >
          {t('galleryImage')}
        </CommonStylesClient.Typography>

        <CommonStylesClient.Typography
          type='pcHeading5'
          sx={{
            color: theme.colors?.client?.midBlack,
            padding: '0.375rem 0.75rem',
            borderRadius: '0.5rem',
            background: `linear-gradient(0deg, rgba(255, 255, 255, 0.86) 0%, rgba(255, 255, 255, 0.86) 100%), ${theme.colors?.client.coBaltBlue}`,
          }}
        >
          {gallery?.length || 0}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box>
        {/* Gallery */}
        <ImageList variant='masonry' cols={3} gap={18}>
          {gallery?.map((item: Media, idx: number) => {
            return (
              <ImageListItem key={item.id}>
                <img
                  style={{ borderRadius: 18 }}
                  src={`${IMG_URL}/${item.url}`}
                  srcSet={`${IMG_URL}/${item.url}?w=258&fit=crop&auto=format&dpr=2 2x`}
                  alt={`Places ${item.id}`}
                  loading='lazy'
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(GalleryPlacesDetail);
