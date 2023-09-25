import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import SearchAndFilters from 'components/SearchAndFilters';
import cachedKeys from 'constants/cachedKeys';
import { FastField } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order, PhoneCode } from 'interfaces/common';
import { Tour } from 'modules/tour/tour.interface';
import useGetListTourGuideSubscribe from 'modules/tourGuideSubscribe/hooks/useGetListTourGuideSubscribe';
import {
  RequestDeleteTourGuideSubscribe,
  TourGuideSubscribe,
} from 'modules/tourGuideSubscribe/tourGuideSubscribe.interface';
import tourGuideSubscribeServices from 'modules/tourGuideSubscribe/tourGuideSubscribe.services';
import { useTranslations } from 'next-intl';
import React from 'react';
import { AllQueryKeys, useGet } from 'stores/useStore';
import { IMG_URL } from 'constants/apiUrls';
import { showPhoneNumberByRegion } from 'helpers/common';
import ImageTourGuidDefault from '../../../../../../../public/images/avatarUser.png';
interface ShowTourGuideProps {
  tour: Tour;
}

interface InitialFiltersSearchTourGuide {
  page: number;
  perPage: number;
  textSearch: string;
}

const initialFilters: InitialFiltersSearchTourGuide = {
  page: 1,
  perPage: 10,
  textSearch: '',
};

export default function ShowTourguide(props: ShowTourGuideProps) {
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
    data: resListTourGuideSubscribe,
    isLoading,
    isFetchingPage,
    isRefetching,
  } = useGetListTourGuideSubscribe(tour?.id, filters, {
    refetchKey: cachedKeys.refetchListTourGuideSubscribe,
  });

  const refetchListTourGuideSubscribe = useGet(
    cachedKeys.refetchListTourGuideSubscribe as AllQueryKeys
  );

  const listTourGuideSubscribe = resListTourGuideSubscribe?.data?.data?.items || [];
  const totalItems = resListTourGuideSubscribe?.data?.data?.totalItems || 0;

  //! Function
  const handleDelete = async (item: TourGuideSubscribe) => {
    try {
      const response = await tourGuideSubscribeServices.deleteTourGuideSubscribe(
        item.id as unknown as RequestDeleteTourGuideSubscribe
      );

      refetchListTourGuideSubscribe && (await refetchListTourGuideSubscribe());
      showSuccess(t('Tour.deleteLocalFriendSubscribe'));
    } catch (error) {
      showError(error);
    }
  };

  const headCells = [
    {
      id: 'image',
      label: t('Tour.image'),
      Cell: (row: TourGuideSubscribe) => {
        return (
          <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={
                row?.TourGuide?.avatar
                  ? `${IMG_URL}/${row?.TourGuide?.avatar}`
                  : `${ImageTourGuidDefault.src}`
              }
              alt='Tour guide Image'
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
      label: t('Tour.localFriend'),
      Cell: (row: TourGuideSubscribe) => {
        return (
          <CommonStyles.Box
            sx={{
              fontSize: '0.875rem',
              color: theme.colors?.custom?.textBlack,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {`${row?.TourGuide?.firstName} ${row?.TourGuide?.lastName}`}
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'status',
      label: t('Tour.status'),
      Cell: (row: TourGuideSubscribe) => {
        return (
          <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CommonStyles.Badge
              label={row?.TourGuide?.status}
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
      Cell: (row: TourGuideSubscribe) => {
        return (
          <CommonStyles.Box
            sx={{
              fontSize: '0.875rem',
              color: theme.colors?.custom?.textBlack,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {showPhoneNumberByRegion(
              row?.TourGuide?.phoneCode || PhoneCode.VN,
              row?.TourGuide?.phone || ''
            )}
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'actions',
      label: '',
      Cell: (row: TourGuideSubscribe) => {
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
          rows={listTourGuideSubscribe}
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
