import React from 'react';
import { usePathname } from 'next/navigation';

import { useGet } from 'stores/useStore';
import { BreadcrumbsDetail } from 'interfaces/common';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { removeLangFromPathname } from 'helpers/common';
import { Vendor } from 'modules/vendor/vendor.interface';
import cachedKeys from 'constants/cachedKeys';

interface PlacesDetailHeadingProps {}

const PlacesDetailHeading = (props: PlacesDetailHeadingProps) => {
  //! State
  const detailOfPlaces: Vendor = useGet(cachedKeys.detailPlaces);
  const pathName = usePathname();

  const detailBreadcumbs: BreadcrumbsDetail[] = [
    { label: detailOfPlaces?.name || '', href: removeLangFromPathname(pathName) || '/' },
  ];
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ marginBottom: '2.5rem', width: '100%' }}>
      <CommonStylesClient.Breadcumbs details={detailBreadcumbs} />
    </CommonStylesClient.Box>
  );
};

export default React.memo(PlacesDetailHeading);
