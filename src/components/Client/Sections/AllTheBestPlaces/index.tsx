import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import React from 'react';
import ImagesAboutPlaces from './Components/ImagesAboutPlaces';
import InformationAboutPlaces from './Components/InformationAboutPlaces';

export default function AllTheBestPlaces() {
  //! State

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Box
        sx={{ maxWidth: MAX_WIDTH_CONTAINER, margin: '0 auto', padding: '7.5rem 0', display: 'flex'}}
      >
        <CommonStylesClient.Box sx={{marginRight: '5rem'}}>
          <ImagesAboutPlaces />
        </CommonStylesClient.Box>
        <CommonStylesClient.Box>
          <InformationAboutPlaces />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
