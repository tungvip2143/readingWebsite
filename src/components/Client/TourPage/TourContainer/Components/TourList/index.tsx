import React from 'react';
import { useTranslations } from 'next-intl';
import EachCategory from 'components/Client/Components/EachCategory';
import queryString from 'query-string';
import pageUrls from 'constants/pageUrls';
import { useGet } from 'stores/useStore';
import { ToursByCategory } from 'modules/toursByCategory/toursByCategory.interface';
import SkeletonLoading from 'components/Client/Components/SkeletonLoading';
import { SkeletonType } from 'constants/common';
import { DetailCategory } from 'interfaces/common';
import cachedKeys from 'constants/cachedKeys';

interface TourListProps {}

const TourList = (props: TourListProps) => {
  //! State
  const listOfCategory = useGet(cachedKeys.listOfCategory) || [];
  const hasCategory = !!useGet(cachedKeys.hasCategory);
  const loadingListOfCategory = useGet(cachedKeys.loadingListOfCategory) || false;
  const detailCategory = useGet(cachedKeys.detailCategory) as DetailCategory;

  //! Function

  //! Render
  if (loadingListOfCategory) {
    return <SkeletonLoading type={SkeletonType.TOUR_LIST} />;
  }
  if (hasCategory) {
    return (
      <EachCategory
        hiddenShowAll={hasCategory}
        label={detailCategory?.label}
        allNumber={listOfCategory?.length}
        tours={listOfCategory}
        isHideBorderBottom
      />
    );
  }
  return listOfCategory?.map((item: ToursByCategory, index: number) => {
    const listItem = item.tours;
    const allNumber = item?.tours?.length;
    const isLastObj = index === listOfCategory.length - 1;
    const bodeParsed = {
      category: item?.category?.id,
    };

    const href = `${pageUrls.Tour}?${queryString.stringify(bodeParsed)}`;
    return (
      <EachCategory
        key={item.id}
        hiddenShowAll={hasCategory}
        label={item?.category?.name || ''}
        href={href}
        allNumber={allNumber}
        tours={listItem}
        isHideBorderBottom={isLastObj}
      />
    );
  });
};

export default React.memo(TourList);
