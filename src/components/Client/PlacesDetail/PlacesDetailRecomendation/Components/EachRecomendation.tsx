import React from 'react';
import { SxProps } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { Places } from 'interfaces/common';
import Place from 'components/Client/Components/Place';
import { VendorRecommendation } from 'modules/vendorRecommendation/vendorRecommendation.interface';
import { IMG_URL } from 'constants/apiUrls';
import { VendorTypeRelation } from 'modules/vendor/vendor.interface';

interface EachRecomendationProps {
  listOfPlaces: VendorRecommendation[] | undefined;
  sxList: SxProps;
}

const EachRecomendation = (props: EachRecomendationProps) => {
  //! State
  const { listOfPlaces = [], sxList } = props;
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        gap: '3rem 1.5rem',
        flexWrap: 'wrap',
        flexDirection: 'row',
      }}
    >
      {listOfPlaces.map((el: VendorRecommendation) => {
         const vendorTypeRelation = el?.VendorTypeRelation;
         const hashtag = vendorTypeRelation?.map((item: VendorTypeRelation) => {
           return item?.type?.name || ''
         }) || ['']
        return (
          <CommonStylesClient.Box key={el.id} sx={{ width: 384, height: 100 }}>
            <Place
              name={el.name}
              price={el.minPrice}
              image={`${IMG_URL}/${el.thumbnail}`}
              hashTag={hashtag}
              rating={Number(el.avgRate)}
              href={el.id.toString()}
            />
          </CommonStylesClient.Box>
        );
      })}
    </CommonStylesClient.Box>
  );
};

export default React.memo(EachRecomendation);
