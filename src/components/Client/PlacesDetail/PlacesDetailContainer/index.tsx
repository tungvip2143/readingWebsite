import React from 'react';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import PlacesDetailThumbnail from './Components/PlacesDetailThumbnail';
import HeadingPlacesDetailContainer from './Components/HeadingPlacesDetailContainer';
import DescriptionPlacesDetailContainer from './Components/DescriptionPlacesDetailContainer';
import ReviewsPlacesDetailContainer from './Components/ReviewsPlacesDetailContainer';
import OpenTimePlacesDetailContainer from './Components/OpenTimePlacesDetailContainer';
import BookPlaces from './Components/BookPlaces';
import GalleryPlacesDetailContainer from './Components/GalleryPlacesDetailContainer';
import AddressPlacesDetailContainer from './Components/AddressPlacesDetailContainer';

interface PlacesDetailContainerProps {}

const PlacesDetailContainer = (props: PlacesDetailContainerProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      {/* Image */}
      <PlacesDetailThumbnail />

      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'row', gap: '5.5rem' }}>
        <CommonStylesClient.Box sx={{ width: 728 }}>
          <HeadingPlacesDetailContainer />

          <DescriptionPlacesDetailContainer />

          <OpenTimePlacesDetailContainer />

          {/* <StillEmptyPlacesDetailContainer /> */}

          <GalleryPlacesDetailContainer />

          <AddressPlacesDetailContainer />

          <ReviewsPlacesDetailContainer />
        </CommonStylesClient.Box>

        <CommonStylesClient.Box
          sx={{
            width: 384,
          }}
        >
          <BookPlaces />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PlacesDetailContainer);
