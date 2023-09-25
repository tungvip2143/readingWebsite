import React from 'react';
import { SxProps } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import Tour from 'components/Client/Components/Tour';
import { TourRecommendation } from 'modules/tourRecommendation/tourRecommendation.interface';
import { IMG_URL } from 'constants/apiUrls';

interface EachRecomendationProps {
  tours: any;
  sxList: SxProps;
}

const EachRecomendation = (props: EachRecomendationProps) => {
  //! State
  const { tours = [], sxList } = props;
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          flexDirection: 'row',
          padding: '1.5rem 0',
          ...sxList,
        }}
      >
        {tours.map((el: TourRecommendation) => {
          return (
            <CommonStylesClient.Box key={el.id} sx={{ width: 287 }}>
              <Tour
                key={el.id}
                href={el.id.toString()}
                image={`${IMG_URL}/${el.thumbnail}`}
                name={el.name}
                place={el?.Area?.name}
                price={el.priceForAdult}
                rating={Number(el.avgRate)}
                id={Number(el.id)}
              />
            </CommonStylesClient.Box>
          );
        })}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(EachRecomendation);
