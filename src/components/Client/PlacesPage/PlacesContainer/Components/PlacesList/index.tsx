import React from 'react';
import { useTranslations } from 'next-intl';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import HeadingList from '../HeadingList';
import Place from 'components/Client/Components/Place';
import { Vendor, VendorTypeRelation } from 'modules/vendor/vendor.interface';
import { IMG_URL } from 'constants/apiUrls';
import SkeletonLoading from 'components/Client/Components/SkeletonLoading';
import { SkeletonType } from 'constants/common';
import pageUrls from 'constants/pageUrls';

interface PlacesListProps {
  listOfPlaces: Vendor[];
  total: number;
  loading: boolean;
}

const PlacesList = (props: PlacesListProps) => {
  //! State
  const { listOfPlaces = [], total = 0, loading } = props;
  const t = useTranslations();
  //! Function

  //! Render
  if (loading) {
    return <SkeletonLoading type={SkeletonType.PLACES_LIST} />;
  }
  return (
    <CommonStylesClient.Box>
      <HeadingList label={t('PlacesPage.allPlaces')} total={total} />
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          gap: '2rem 3.75rem',
          flexWrap: 'wrap',
          flexDirection: 'row',
          padding: '1.5rem 0',
        }}
      >
        {listOfPlaces.map((el: Vendor) => {
          const vendorTypeRelation = el?.VendorTypeRelation;
          const hashtag = vendorTypeRelation?.map((item: VendorTypeRelation) => {
            return item?.type?.name || ''
          }) || ['']

          return (
            <CommonStylesClient.Box key={el.id} sx={{ width: 426, height: 100 }}>
              <Place
                name={el?.name || ''}
                price={Number(el.minPrice)}
                image={`${IMG_URL}/${el.thumbnail}`}
                hashTag={hashtag}
                rating={el?.avgRate || 0}
                href={`${pageUrls.DetailPlaces}${el.id}`}
              />
            </CommonStylesClient.Box>
          );
        })}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PlacesList);
