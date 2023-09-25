import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import React, { memo, useState } from 'react';
import NavbarWithFilters from './Components/NavbarWithFilters';
import TourLists from './Components/TourLists';
import useCheckResolution from 'hooks/useCheckResolution';
import MobileExploreOurTours from '../ExploreOurTours/MobileScreen/index';
import { MAX_WIDTH_CONTAINER, TourStatus } from 'constants/common';
import { useTranslations } from 'next-intl';
import useGetListTour from 'modules/tour/hooks/useGetListTour';
import useFiltersHandler from 'hooks/useFiltersHandler';
import cachedKeys from 'constants/cachedKeys';
import { cloneDeep } from 'lodash';

const ExploreOurTours = () => {
  //! State
  const theme = useTheme();
  const { isMobile } = useCheckResolution();
  const t = useTranslations();
  const [categoriesNumber, setCategoriesNumber] = useState<number>(0);

  const initialFilters = {
    status: TourStatus.PUBLISH,
  };

  const { filters, handleSearch } = useFiltersHandler(initialFilters);

  const {
    data: resTourList,
    isLoading: isLoadingTourList,
    refetch,
  } = useGetListTour(filters, {
    refetchKey: cachedKeys.refetchListTour,
  });

  //! Function
  const onChangeFilters = (value: number) => {
    const cloneFilters = cloneDeep(filters);
    const values = { ...cloneFilters, categories: value };
    setCategoriesNumber(Number(value));
    refetch();
    return handleSearch(values);
  };
  //! Render
  if (isMobile) {
    return <MobileExploreOurTours />;
  }

  return (
    <CommonStylesClient.Box sx={{ backgroundColor: theme.colors?.client.backgroundBlue }}>
      <CommonStylesClient.Box
        sx={{ maxWidth: MAX_WIDTH_CONTAINER, padding: '5rem 0', margin: '0 auto' }}
      >
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '3rem',
          }}
        >
          <CommonStylesClient.Box sx={{ width: '100%' }}>
            <CommonStylesClient.Typography
              type='pcHeading2'
              sx={{ color: theme.colors?.client.white }}
            >
              {t('ExploreOurTours.exploreOurTours')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>

          <CommonStylesClient.Box>
            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme.colors?.client.lightGray }}
            >
              {t('ExploreOurTours.titleDescription')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>

        <NavbarWithFilters onChange={onChangeFilters} />
        <TourLists
          data={resTourList}
          loading={isLoadingTourList}
          categoriesNumber={categoriesNumber}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default memo(ExploreOurTours);
