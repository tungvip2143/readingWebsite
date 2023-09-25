import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useTheme } from '@mui/material';
import { TourGuide } from 'modules/tourGuide/tourGuide.interface';
import TourGuideItem from './TourGuideItem';
import useGetListTourGuide from 'modules/tourGuide/hooks/useGetListTourGuide';
import { Tour } from 'modules/tour/tour.interface';
import { TourGuideSubscribe } from 'modules/tourGuideSubscribe/tourGuideSubscribe.interface';
import { TourGuideInfoStatus } from 'constants/common';
import cachedKeys from 'constants/cachedKeys';
import { Order } from 'interfaces/common';

interface AddTourGuideProps {
  tour: Tour;
}
interface InitialFiltersSearchTourguide {
  page: number;
  perPage: number;
  textSearch?: string;
  status: TourGuideInfoStatus;
  sortField: string;
  sortOrder: Order;
  provinceCode?: string;
}

export default function AddTourGuide(props: AddTourGuideProps) {
  //! State
  const { tour } = props;
  const t = useTranslations();
  const theme = useTheme();

  const initialFilters: InitialFiltersSearchTourguide = {
    page: 1,
    perPage: 1000,
    textSearch: undefined,
    status: TourGuideInfoStatus.VERIFIED,
    sortField: 'createdAt',
    sortOrder: Order.desc,
    provinceCode: tour?.Area?.provinceCode || undefined,
  };
  const { filters, handleSearch } = useFiltersHandler(initialFilters);
  const {
    data: resListTourGuide,
    isLoading,
    isFetchingPage,
    isRefetching,
  } = useGetListTourGuide(filters, {
    refetchKey: cachedKeys.refetchListTourGuideInAddTourSubscribe,
  });

  const listTourGuide = (resListTourGuide?.items || []).filter((el: TourGuide) => {
    const indexItem = el?.TourGuideSubscribed?.findIndex(
      (elm: TourGuideSubscribe) => elm.tourId === tour?.id
    );

    if (indexItem === -1) {
      return el;
    }
  });

  //! Function

  //! Render
  if (isLoading || isFetchingPage || isRefetching) {
    return (
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CommonStyles.Loading />
      </CommonStyles.Box>
    );
  }

  return (
    <CommonStyles.Box>
      <SearchAndFilters
        initialValues={filters}
        renderFilterFields={() => {
          return (
            <CommonStyles.Box sx={{ flex: 1 }}>
              <FastField
                variant='outlined'
                component={CustomFields.TextField}
                name='textSearch'
                placeholder={t('Common.search')}
                iconInput={<CommonIcons.Search />}
                className='input-search'
                size='small'
                fullWidth
              />
            </CommonStyles.Box>
          );
        }}
        onSubmit={(values) => {
          const nextValues = {
            ...values,
            textSearch: values?.textSearch?.trim(),
          };
          handleSearch(nextValues);
        }}
        hideResetButton
      />

      {listTourGuide.length > 0 ? (
        <CommonStyles.Box sx={{ marginTop: '2.5rem' }}>
          {listTourGuide?.map((elm: TourGuide) => {
            return <TourGuideItem key={elm?.id} tourGuide={elm} tour={tour} />;
          })}
        </CommonStyles.Box>
      ) : (
        <CommonStyles.Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 1,
            marginTop: '2.5rem',
          }}
        >
          <CommonIcons.InboxIcon fontSize='large' htmlColor={theme.colors?.bgneutral500} />
          <CommonStyles.Typography variant='body1' sx={{ color: theme.colors?.bgneutral500 }}>
            {t('Common.noDataFound')}
          </CommonStyles.Typography>
        </CommonStyles.Box>
      )}
    </CommonStyles.Box>
  );
}
