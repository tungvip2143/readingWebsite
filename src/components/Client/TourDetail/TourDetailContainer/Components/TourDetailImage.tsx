import React from 'react';
import ReactPlayer from 'react-player';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useGet } from 'stores/useStore';
import { Tour } from 'modules/tour/tour.interface';
import { IMG_URL } from 'constants/apiUrls';
import cachedKeys from 'constants/cachedKeys';
import { isImage, sortGallery } from 'helpers/common';
import CommonIcons from 'components/CommonIcons';
import { Media } from 'interfaces/common';

interface TourDetailImageProps {}

const TourDetailImage = (props: TourDetailImageProps) => {
  //! State
  const detailOfTourData: Tour = useGet(cachedKeys.detailTour);
  const gallery = detailOfTourData?.Gallery?.[0]?.Media;
  const galleryUrl = gallery?.map((item: Media, index, array) => {
    const url = item?.url;
    return url;
  }) as string[];
  const galleryConverted = sortGallery(galleryUrl) as string[];

  const imageMain = galleryConverted?.[0] as string;
  const imageSub1 = galleryConverted?.[1] as string;
  const imageSub2 = galleryConverted?.[2] as string;

  const isImageMain = isImage(imageMain);
  const isImageSub1 = isImage(imageSub1);
  const isImageSub2 = isImage(imageSub2);
  //! Function

  const renderVideoPreview = (url: string, isImageMain?: boolean) => {
    return (
      <ReactPlayer
        url={url}
        width={isImageMain ? 792 : 384}
        height={isImageMain ? 568 : 272}
        playing={true}
        controls
      />
    );
  };

  const renderImagePreview = (url: string, isImageMain?: boolean) => {
    return (
      <img width={isImageMain ? 792 : 384} height={isImageMain ? 568 : 272} alt='' src={url} />
    );
  };

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
        video: {
          borderRadius: '1rem',
          objectFit: 'cover',
        },
      }}
    >
      {isImageMain
        ? renderImagePreview(`${IMG_URL}/${imageMain}`, true)
        : renderVideoPreview(`${IMG_URL}/${imageMain}`, true)}
      {/* <img width={792} height={568} alt='' src={`${IMG_URL}/${imageMain}`} /> */}
      <CommonStylesClient.Box sx={{ display: 'flex', gap: '1.5rem', flexDirection: 'column' }}>
        {isImageSub1
          ? renderImagePreview(`${IMG_URL}/${imageSub1}`)
          : renderVideoPreview(`${IMG_URL}/${imageSub1}`)}
        {isImageSub2
          ? renderImagePreview(`${IMG_URL}/${imageSub2}`)
          : renderVideoPreview(`${IMG_URL}/${imageSub2}`)}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(TourDetailImage);
