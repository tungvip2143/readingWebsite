import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import useFiltersHandler from 'hooks/useFiltersHandler';
import useGetListVendor from 'modules/vendor/hooks/useGetListVendor';
import { Vendor } from 'modules/vendor/vendor.interface';
import { useTranslations } from 'next-intl';
import React from 'react';
import VendorItem from './VendorItem';
import { useTheme } from '@mui/material';
import { Tour } from 'modules/tour/tour.interface';
import cachedKeys from 'constants/cachedKeys';
import { VendorSubscribe } from 'modules/vendorSubscribe/vendorSubscribe.interface';

interface CreateServiceProps {
  tour: Tour;
}

interface InitialFiltersSearchService {
  textSearch: string;
  page: number;
  perPage: number;
}

const initialFilters: InitialFiltersSearchService = {
  textSearch: '',
  page: 1,
  perPage: 1000,
};

export default function CreateService(props: CreateServiceProps) {
  //! State
  const { tour } = props;
  const t = useTranslations();
  const theme = useTheme();
  const { filters, handleSearch } = useFiltersHandler(initialFilters);
  const {
    data: resListVendor,
    isLoading,
    isFetchingPage,
    isRefetching,
  } = useGetListVendor(filters, { refetchKey: cachedKeys.refetchListVendorInAddVendorSubscribe });

  const listVendor = (resListVendor?.data?.data?.items || []).filter((el: Vendor) => {
    const indexItem = el?.VendorSubscribe?.findIndex(
      (elm: VendorSubscribe) => elm.tourId === tour?.id
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
            textSearch: values.textSearch.trim(),
          };
          handleSearch(nextValues);
        }}
        hideResetButton
      />

      {listVendor.length > 0 ? (
        <CommonStyles.Box sx={{ marginTop: '2.5rem' }}>
          {listVendor?.map((elm: Vendor) => {
            return <VendorItem key={elm.id} vendor={elm} tour={tour} />;
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
