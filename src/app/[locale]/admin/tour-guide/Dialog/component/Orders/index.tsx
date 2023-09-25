import React from 'react';
import { useTheme } from '@mui/material';
import { useFormatter, useTranslations } from 'next-intl';

import { Order } from 'interfaces/common';
import CommonStyles from 'components/CommonStyles';
import useFiltersHandler from 'hooks/useFiltersHandler';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import CustomFields from 'components/CustomFields';
import CommonIcons from 'components/CommonIcons';
import { BookingTour, BookingTourList } from 'modules/bookingTour/bookingTour.interface';
import moment from 'moment';
import useGetListBookingTourByTourGuide from 'modules/bookingTour/hooks/useGetListBookingTourByTourGuide';

interface OrdersTableProps {
  idTourGuide?: number;
}
export interface FormFilterTourBookingByTourGuide {
  tourGuideId?: number;
  page?: number;
  perPage?: number;
  sortField?: '';
  sortOrder?: Order;
  textSearch?: string;
  status?: number;
}
const OrdersTable = (props: OrdersTableProps) => {
  //! State
  const {
    filters,
    rowsSelected,
    resetToInitialFilters,
    handleSelectAll,
    handleCheckBox,
    handleChangePage,
    handleRequestSort,
    changeRowPerPage,
    handleSearch,
  } = useFiltersHandler({
    page: 1,
    perPage: 10,
    textSearch: '',
    tourGuideId: props.idTourGuide,
  });

  const {
    data: dataTourGuide,
    isLoading,
    isRefetching,
    isFetchingPage,
  } = useGetListBookingTourByTourGuide(filters, { isTrigger: !!props.idTourGuide });

  const theme = useTheme();
  const t = useTranslations();
  const totalCount = dataTourGuide?.totalItems || 0;

  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Box sx={{ mt: 2 }}>
        <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CommonIcons.Info color='primary' sx={{ fontSize: '1.75rem' }} />
          <CommonStyles.Typography variant='h5' color={theme.colors?.bgneutral700}>
            {t('LocalFriend.tourHistory')}
          </CommonStyles.Typography>
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ flex: 1, mb: 2 }}>
          <SearchAndFilters
            initialValues={filters}
            onSubmit={(values) => {
              handleSearch(values);
            }}
            onReset={() => {
              resetToInitialFilters();
            }}
            sxContainer={{ display: 'flex', justifyContent: 'space-between' }}
            // isChild
            // buttonSubmitProps={(propsFormik) => ({
            //   type: 'button',
            //   onClick: () => propsFormik.handleSubmit(),
            // })}
            renderFilterFields={() => {
              return (
                <CommonStyles.Box sx={{ gap: 2, display: 'flex', flex: 1 }}>
                  <FastField
                    component={CustomFields.TextField}
                    name='textSearch'
                    placeholder={t('Common.search')}
                    sx={{ width: '100%' }}
                    size='small'
                  />
                </CommonStyles.Box>
              );
            }}
          />
        </CommonStyles.Box>

        <CommonStyles.Table
          isLoading={isLoading || isRefetching || isFetchingPage}
          order={Order.desc}
          orderBy={Order.desc}
          selected={rowsSelected}
          page={filters.page}
          headCells={[
            {
              label: t('Booking.orderID'),
              id: 'id',
            },
            {
              label: t('LocalFriend.tourName'),
              id: 'Tours',
              Cell: (row: BookingTour) => {
                const name = row?.Tours?.name || '';
                return <CommonStyles.Typography>{name}</CommonStyles.Typography>;
              },
            },
            {
              label: t('LocalFriend.customerName'),
              id: 'CustomerName',
              Cell: (row: BookingTour) => {
                const fullname = `${row?.Customer?.firstName} ${row?.Customer?.lastName}` || '';
                return <CommonStyles.Typography>{fullname}</CommonStyles.Typography>;
              },
            },
            {
              label: t('LocalFriend.date'),
              id: 'createdAt',
              Cell: (row: BookingTour) => {
                const date = moment(row?.createdAt).format('DD-MM-YYYY') || '';
                return <CommonStyles.Typography>{date}</CommonStyles.Typography>;
              },
            },
            {
              label: t('LocalFriend.amountPayment'),
              id: 'price',
            },
            {
              label: t('LocalFriend.location'),
              id: 'area',
              Cell: (row: BookingTour) => {
                const location = row?.Tours?.Area?.name || '';
                return <CommonStyles.Typography>{location}</CommonStyles.Typography>;
              },
            },
            {
              label: t('LocalFriend.status'),
              id: 'status',
              Cell: (row: BookingTour) => {
                const status = row?.status || '';
                return <CommonStyles.Badge label={status} category='purple' />;
              },
            },
            {
              label: t('LocalFriend.paymentStatus'),
              id: 'TourBookingTransaction',
              Cell: (row: BookingTour) => {
                const statusPayment = row?.TourBookingTransaction?.status || '';
                return <CommonStyles.Badge label={statusPayment} category='blue' />;
              },
            },
          ]}
          totalCount={totalCount}
          rows={dataTourGuide?.items || []}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={changeRowPerPage}
          rowsPerPage={filters.perPage}
          handleRequestSort={handleRequestSort}
          handleSelectAllClick={handleSelectAll}
          handleCheckBox={handleCheckBox}
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(OrdersTable);
