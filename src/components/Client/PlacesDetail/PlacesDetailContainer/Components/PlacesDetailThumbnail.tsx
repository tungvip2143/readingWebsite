import React from 'react';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useGet } from 'stores/useStore';
import { DetailOfPlaces } from 'interfaces/common';
import { Vendor } from 'modules/vendor/vendor.interface';
import { IMG_URL } from 'constants/apiUrls';
import cachedKeys from 'constants/cachedKeys';

interface PlacesDetailThumbnailProps {}

const PlacesDetailThumbnail = (props: PlacesDetailThumbnailProps) => {
  //! State
  const deatailOfPlaces: Vendor = useGet(cachedKeys.detailPlaces);
  const thumbnail = `${IMG_URL}/${deatailOfPlaces?.thumbnail}` || '';
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        gap: '1.5rem',
        flexDirection: 'row',
        marginBottom: '2rem',
        img: {
          borderRadius: '1rem',
          objectFit: 'cover',
        },
      }}
    >
      <img width={1200} height={340} alt='' src={thumbnail} />
    </CommonStylesClient.Box>
  );
};

export default React.memo(PlacesDetailThumbnail);
