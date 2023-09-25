import React from 'react';
import { usePathname } from 'next/navigation';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { BreadcrumbsDetail } from 'interfaces/common';
import { useGet } from 'stores/useStore';
import { removeLangFromPathname } from 'helpers/common';
import { Tour } from 'modules/tour/tour.interface';
import cachedKeys from 'constants/cachedKeys';

interface TourDetailHeadingProps {}

const TourDetailHeading = (props: TourDetailHeadingProps) => {
  //! State
  const pathName = usePathname();
  const detailOfTourData: Tour = useGet(cachedKeys.detailTour);

  const detailBreadcumbs: BreadcrumbsDetail[] = [
    {
      label: detailOfTourData?.name || '',
      href: removeLangFromPathname(pathName) || '/',
    },
  ];
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ marginBottom: '2.5rem', width: '100%' }}>
      <CommonStylesClient.Breadcumbs details={detailBreadcumbs} />
    </CommonStylesClient.Box>
  );
};

export default React.memo(TourDetailHeading);
