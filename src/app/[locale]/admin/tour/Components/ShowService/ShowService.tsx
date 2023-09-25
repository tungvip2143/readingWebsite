import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useTheme } from '@mui/material';
import { Order, PhoneCode } from 'interfaces/common';
import { IMG_URL } from 'constants/apiUrls';
import { formatCurrency, showPhoneNumberByRegion } from 'helpers/common';
import { Tour } from 'modules/tour/tour.interface';
import useGetListVendorSubscribe from 'modules/vendorSubscribe/hooks/useGetListVendorSubscribe';
import {
  RequestDeleteVendorSubscribe,
  VendorSubscribe,
} from 'modules/vendorSubscribe/vendorSubscribe.interface';
import vendorSubscribeServices from 'modules/vendorSubscribe/vendorSubscribe.services';
import cachedKeys from 'constants/cachedKeys';
import { AllQueryKeys, useGet } from 'stores/useStore';
import { showError, showSuccess } from 'helpers/toast';

interface ShowServiceProps {
  tour: Tour;
}

interface InitialFiltersSearchService {
  page: number;
  perPage: number;
  textSearch: string;
}

const initialFilters: InitialFiltersSearchService = {
  page: 1,
  perPage: 10,
  textSearch: '',
};

export default function ShowService(props: ShowServiceProps) {
  //! State
  const { tour } = props;
  const t = useTranslations();
  const theme = useTheme();
  const {
    filters,
    rowsSelected,
    handleSearch,
    handleChangePage,
    handleRequestSort,
    changeRowPerPage,
  } = useFiltersHandler(initialFilters);

  const {
    data: resListVendorSubscribe,
    isLoading,
    isFetchingPage,
    isRefetching,
  } = useGetListVendorSubscribe(tour?.id, filters, {
    refetchKey: cachedKeys.refetchListVendorSubscribe,
  });

  const refetchListVendorSubscribe = useGet(cachedKeys.refetchListVendorSubscribe as AllQueryKeys);

  const listVendorSubscribe = resListVendorSubscribe?.data?.data?.items || [];
  const totalItems = resListVendorSubscribe?.data?.data?.totalItems || 0;

  //! Function
  const handleDelete = async (item: VendorSubscribe) => {
    try {
      const response = await vendorSubscribeServices.deleteVendorSubscribe(
        item.id as unknown as RequestDeleteVendorSubscribe
      );

      refetchListVendorSubscribe && (await refetchListVendorSubscribe());
      showSuccess(t('Tour.deleteVendorSubscribe'));
    } catch (error) {
      showError(error);
    }
  };

  const headCells = [
    {
      id: 'image',
      label: t('Tour.image'),
      Cell: (row: VendorSubscribe) => {
        return (
          <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={`${IMG_URL}/${row?.vendor?.thumbnail}`}
              alt='Service Image'
              style={{
                width: '5rem',
                height: '3.75rem',
                objectFit: 'cover',
                borderRadius: '0.625rem',
              }}
            />
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'name',
      label: t('Tour.shopName'),
      Cell: (row: VendorSubscribe) => {
        return (
          <CommonStyles.Box
            sx={{
              fontSize: '0.875rem',
              color: theme.colors?.custom?.textBlack,
              fontWeight: 600,
              minWidth: '6.25rem',
              textAlign: 'center',
            }}
          >
            {row?.vendor?.name}
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'status',
      label: t('Tour.status'),
      Cell: (row: VendorSubscribe) => {
        return (
          <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CommonStyles.Badge
              label={row?.vendor?.status}
              category='purple'
              sx={{ fontSize: '0.75rem', borderRadius: '0.875rem', padding: '0.375rem 0.5rem' }}
            />
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'phone',
      label: t('Tour.phone'),
      Cell: (row: VendorSubscribe) => {
        return (
          <CommonStyles.Box
            sx={{
              fontSize: '0.875rem',
              color: theme.colors?.custom?.textBlack,
              fontWeight: 600,
              minWidth: '6.25rem',
              textAlign: 'center',
            }}
          >
            {showPhoneNumberByRegion(
              row?.vendor?.phoneCode || PhoneCode.VN,
              row?.vendor?.phone || ''
            )}
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'bookingPrice',
      label: t('Tour.bookingPrice'),
      Cell: (row: VendorSubscribe) => {
        return (
          <CommonStyles.Box
            sx={{
              fontSize: '0.875rem',
              color: theme.colors?.custom?.textBlack,
              fontWeight: 600,
              minWidth: '6.25rem',
              textAlign: 'center',
            }}
          >
            {formatCurrency(row?.vendor?.bookingPrice as number)}
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'actions',
      label: '',
      Cell: (row: VendorSubscribe) => {
        return (
          <CommonStyles.Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem 0.75rem',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                borderRadius: '0.625rem',
              },
            }}
          >
            <CommonIcons.DeleteIcon
              onClick={() => handleDelete(row)}
              sx={{ color: theme.colors?.red500 }}
            />
          </CommonStyles.Box>
        );
      },
    },
  ];

  //! Render
  return (
    <CommonStyles.Box>
      <SearchAndFilters
        initialValues={filters}
        renderFilterFields={() => {
          return (
            <CommonStyles.Box sx={{ width: '60%' }}>
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

      <CommonStyles.Box sx={{ marginTop: '2rem' }}>
        <CommonStyles.Table
          sxTableHead={{
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: theme.colors?.bgneutral500,
            fontWeight: '550',
          }}
          selected={rowsSelected}
          headCells={headCells}
          rows={listVendorSubscribe}
          order={Order.desc}
          orderBy={''}
          page={filters.page || 1}
          rowsPerPage={filters.perPage || 5}
          totalCount={totalItems}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={changeRowPerPage}
          handleRequestSort={handleRequestSort}
          isLoading={isFetchingPage || isRefetching || isLoading}
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
}
