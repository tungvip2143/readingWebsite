import CommonStylesClient from 'components/Client/CommonStylesClient';
import Image from 'next/image';
import React from 'react';
import places1 from '../../../../../../public/images/Client/places1.png';
import places2 from '../../../../../../public/images/Client/places2.png';
import places3 from '../../../../../../public/images/Client/places3.png';
import places4 from '../../../../../../public/images/Client/places4.png';

export default function ImagesAboutPlaces() {
  //! State

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <CommonStylesClient.Box>
        <CommonStylesClient.Box sx={{ marginBottom: '1.5rem' }}>
          <Image src={places1} alt='Glass of orange juice' />
        </CommonStylesClient.Box>

        <CommonStylesClient.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Image src={places2} alt='Tourist attraction' />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box>
        <CommonStylesClient.Box sx={{ marginBottom: '1.5rem' }}>
          <Image src={places3} alt='Restaurant' />
        </CommonStylesClient.Box>

        <CommonStylesClient.Box>
          <Image src={places4} alt='Food' />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
