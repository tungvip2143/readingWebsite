import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Order } from 'interfaces/common';
import CommonStyles from 'components/CommonStyles';
import useFiltersHandler from 'hooks/useFiltersHandler';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import CustomFields from 'components/CustomFields';
import useConstants from 'hooks/useConstants';
import CommonIcons from 'components/CommonIcons';
import FormikField from 'components/FormikField';
import Timer from 'helpers/timer';
import CommonIconsClient from 'components/Client/CommonIcons';
import { FilterStatusTourBooking } from 'constants/common';
import { FormFilterTourBooking } from 'app/[locale]/local-friend/booking-tour/page';
import useGetListBookingTour from 'modules/bookingTour/hooks/useGetListBookingTour';
import cachedKeys from 'constants/cachedKeys';
import { BookingTour } from 'modules/bookingTour/bookingTour.interface';
import moment, { MomentInput } from 'moment';
import { capitalize, cloneDeep, isNull } from 'lodash';
import { convertToQueryDate } from 'helpers/common';
import { formatCurrency } from 'helpers/common';

interface BookingTableProps {}

const timer = new Timer();

const initialFilters: FormFilterTourBooking = {
  page: 1,
  perPage: 10,
  sortField: 'createdAt',
  sortOrder: Order.desc,
  textSearch: '',
  tab: '',
  from: '',
  to: '',
  createdAt: Order.desc,
};

const BookingTable = (props: BookingTableProps) => {
  //! State
  const { optionsStatusTourBooking, optionsSortCreatedAt } = useConstants();
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
  } = useFiltersHandler(initialFilters);

  const {
    data: resListTourBooking,
    isLoading: isLoading,
    isFetchingPage,
    isRefetching,
  } = useGetListBookingTour(filters, {
    refetchKey: cachedKeys.refetchListTourBookingUIAdmin,
  });

  const listTourBooking = resListTourBooking?.items || [];
  const totalItems = resListTourBooking?.totalItems || 0;

  const theme = useTheme();
  const t = useTranslations();
  const headCell = useMemo(() => {
    return [
      {
        label: t('Booking.orderDay'),
        id: 'orderDay',
        Cell: (row: BookingTour) => {
          return (
            <CommonStyles.Box sx={{ fontSize: '0.875rem', color: theme.colors?.custom?.textBlack }}>
              {transformDateTime(row?.startTime)}
            </CommonStyles.Box>
          );
        },
      },
      {
        label: t('Booking.orderID'),
        id: 'id',
        Cell: (row: BookingTour) => {
          return (
            <CommonStyles.Box
              sx={{
                width: '6.25rem',
                fontSize: '0.875rem',
                color: theme.colors?.custom?.textBlack,
                textAlign: 'center',
              }}
            >
              {row?.id}
            </CommonStyles.Box>
          );
        },
      },
      {
        label: t('Booking.customerName'),
        id: 'customerName',
        Cell: (row: BookingTour) => {
          return (
            <CommonStyles.Box
              sx={{
                fontWeight: '700',
                fontSize: '0.875rem',
                color: theme.colors?.custom?.textBlack,
                width: '6.25rem',
              }}
            >
              {`${row?.Customer?.firstName} ${row?.Customer?.lastName}`}
            </CommonStyles.Box>
          );
        },
      },
      {
        label: t('Booking.status'),
        id: 'status',
        Cell: (row: BookingTour) => {
          const status = parseStatusToLabel(row?.status || '');
          return (
            <CommonStyles.Badge
              label={status}
              category='purple'
              sx={{ padding: '0.5rem', minWidth: '6.25rem', textAlign: 'center' }}
            />
          );
        },
      },
      {
        label: t('Booking.paymentStatus'),
        id: 'paymentStatus',
        Cell: (row: BookingTour) => {
          const paymentStatus = row?.tour_booking_transaction_status;
          return paymentStatus ? (
            <CommonStyles.Box sx={{ width: '6.25rem' }}>
              <CommonStyles.Badge label={paymentStatus} category='blueNoBg' />
            </CommonStyles.Box>
          ) : (
            <CommonStyles.Box
              sx={{
                width: '6.25rem',
                fontSize: '0.875rem',
                color: theme.colors?.custom?.textBlack,
                textAlign: 'center',
              }}
            >
              -
            </CommonStyles.Box>
          );
        },
      },
      {
        label: t('Booking.category'),
        id: 'category',
        Cell: (row: BookingTour) => {
          return (
            <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {row?.Tours?.categories?.map((el) => {
                return (
                  <CommonStyles.Badge key={el?.id} label={el?.category?.name} category='blue' />
                );
              })}
            </CommonStyles.Box>
          );
        },
      },
      {
        label: t('Booking.orderAmount'),
        id: 'totalPrice',
        Cell: (row: BookingTour) => {
          return (
            <CommonStyles.Box sx={{ fontSize: '0.875rem', color: theme.colors?.custom?.textBlack }}>
              {formatCurrency(row?.totalPrice || 0)}đ
            </CommonStyles.Box>
          );
        },
      },
      {
        label: t('Booking.tourName'),
        id: 'tourName',
        Cell: (row: BookingTour) => {
          return (
            <CommonStyles.Box
              sx={{
                fontSize: '0.875rem',
                color: theme.colors?.custom?.textBlack,
                width: '12.5rem',
                textAlign: 'center',
              }}
            >
              {row?.Tours?.name}
            </CommonStyles.Box>
          );
        },
      },
      {
        label: t('Booking.localFriend'),
        id: 'localFriend',
        Cell: (row: BookingTour) => {
          const hasTourGuide = row?.TourGuide
            ? `${row?.TourGuide.firstName} ${row?.TourGuide.lastName}`
            : '-';
          return (
            <CommonStyles.Box
              sx={{
                width: '6.25rem',
                fontSize: '0.875rem',
                color: theme.colors?.custom?.textBlack,
                textAlign: 'center',
              }}
            >
              {hasTourGuide}
            </CommonStyles.Box>
          );
        },
      },
      {
        label: t('Booking.rating'),
        id: 'rating',
        Cell: (row: BookingTour) => {
          const rating = row?.Tours?.avgRate || 0;
          return <CommonStyles.RatingMui valueTable={rating} readOnly />;
        },
      },
      {
        label: t('Booking.promoCode'),
        id: 'promoCode',
        Cell: (row: BookingTour) => {
          return (
            <CommonStyles.Box
              sx={{
                width: '6.25rem',
                fontSize: '0.875rem',
                color: theme.colors?.custom?.textBlack,
                textAlign: 'center',
              }}
            >
              -
            </CommonStyles.Box>
          );
        },
      },
    ];
  }, [listTourBooking]);

  //! Function
  const transformDateTime = (orderDay: string | Date | undefined) => {
    const day = moment(orderDay as MomentInput).format('DD/MM/YYYY');
    return <span>{day}</span>;
  };

  const parseStatusToLabel = (status: string) => {
    switch (status) {
      case FilterStatusTourBooking.NEW:
        return capitalize(t('TourBooking.new'));
      case FilterStatusTourBooking.APPLIED:
        return capitalize(t('TourBooking.applied'));
      case FilterStatusTourBooking.MATCHED:
        return capitalize(t('TourBooking.picked'));
      case FilterStatusTourBooking.PAYMENT_SUCCESS:
        return capitalize(t('TourBooking.confirmed'));
      case FilterStatusTourBooking.EXPIRED_PAYMENT:
        return capitalize(t('TourBooking.expiredPayment'));
      case FilterStatusTourBooking.CUSTOMER_CANCELED:
        return capitalize(t('TourBooking.customerCancelled'));
      case FilterStatusTourBooking.TOUR_GUIDE_CANCELED:
        return capitalize(t('TourBooking.hostCancelled'));
      case FilterStatusTourBooking.SUCCESSFULLY:
        return capitalize(t('TourBooking.successfully'));
      default:
        return '';
    }
  };

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Heading title='Order/Booking'>
        <CommonStyles.Box sx={{ flex: 1, mb: 2 }}>
          <SearchAndFilters
            initialValues={filters}
            onSubmit={(values) => {
              const { from, to, textSearch, ...rest } = values;

              const nextValues = {
                ...rest,
                textSearch: textSearch.trim(),
                from: convertToQueryDate(from),
                to: convertToQueryDate(to),
              };
              handleSearch(cloneDeep(nextValues));
            }}
            onReset={() => {
              resetToInitialFilters();
            }}
            sxContainer={{ display: 'flex', flexDirection: 'column' }}
            renderFilterFields={(propsFormik) => {
              return (
                <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CommonStyles.Box sx={{ gap: 2, display: 'flex', flex: 1 }}>
                    <CommonStyles.Box sx={{ width: '50%' }}>
                      <FastField
                        component={CustomFields.TextField}
                        iconStartInput={<CommonIcons.Search />}
                        name='textSearch'
                        placeholder={t('Index.search')}
                        sx={{ width: '100%' }}
                        size='small'
                      />
                    </CommonStyles.Box>

                    <CommonStyles.Box sx={{ display: 'flex', gap: 2 }}>
                      <CommonStyles.Box>
                        <FastField
                          name='tab'
                          component={CustomFields.SelectField}
                          options={optionsStatusTourBooking}
                          size='small'
                          sx={{
                            color: theme.colors?.custom?.textBlack,
                            backgroundColor: theme.colors?.white,
                            [theme.breakpoints.down('sm')]: {
                              '& div': {
                                width: '5.25rem',
                              },
                            },
                          }}
                          placeholder={t('Tour.statusTourDefault')}
                          className='active-select'
                          fullWidth
                          onChangeCustomize={(value: FilterStatusTourBooking) => {
                            if (value !== undefined) {
                              propsFormik.setFieldValue('tab', value);
                            }
                          }}
                        />
                      </CommonStyles.Box>

                      <CommonStyles.Box>
                        <FastField
                          name='createdAt'
                          component={CustomFields.SelectField}
                          options={optionsSortCreatedAt}
                          size='small'
                          sx={{
                            color: theme.colors?.custom?.textBlack,
                            backgroundColor: theme.colors?.white,
                            [theme.breakpoints.down('sm')]: {
                              '& div': {
                                width: '5.25rem',
                              },
                            },
                          }}
                          label={t('Tour.createdAt')}
                          fullWidth
                          onChangeCustomize={(value: Order) => {
                            propsFormik.setFieldValue('createdAt', value);
                            propsFormik.setFieldValue('sortField', 'createdAt');
                            propsFormik.setFieldValue('sortOrder', value);
                          }}
                        />
                      </CommonStyles.Box>
                    </CommonStyles.Box>
                  </CommonStyles.Box>
                  <CommonStyles.Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                    }}
                  >
                    <CommonStyles.Box sx={{ width: '100%', maxWidth: '15rem', height: 'inherit' }}>
                      <FormikField
                        component={CustomFields.DatePickerField}
                        icon={CommonIconsClient.IconCalendarOutlined}
                        name='from'
                        isDayjs
                        formatCustom='DD/MM/YYYY'
                        sxContainer={{
                          width: '100%',
                          height: 'inherit',
                          borderRadius: '1rem',
                          '& div': {
                            height: 'inherit',
                            borderRadius: '1rem',
                            '& input': { height: 'inherit' },
                          },
                          '& fieldset': {
                            border: `0.09375rem solid ${theme.colors?.client.midGray} `,
                          },
                        }}
                        afterOnChange={(newDate: FormFilterTourBooking) => {
                          if (isNull(newDate)) {
                            propsFormik.setFieldValue('from', undefined);
                          }
                        }}
                      />
                    </CommonStyles.Box>
                    <CommonStyles.Box sx={{ width: '100%', maxWidth: '15rem', height: 'inherit' }}>
                      <FormikField
                        component={CustomFields.DatePickerField}
                        icon={CommonIconsClient.IconCalendarOutlined}
                        name='to'
                        isDayjs
                        formatCustom='DD/MM/YYYY'
                        sxContainer={{
                          width: '100%',
                          height: 'inherit',
                          borderRadius: '1rem',
                          '& div': {
                            height: 'inherit',
                            borderRadius: '1rem',
                            '& input': { height: 'inherit' },
                          },
                          '& fieldset': {
                            border: `0.09375rem solid ${theme.colors?.client.midGray} `,
                          },
                        }}
                      />
                    </CommonStyles.Box>
                  </CommonStyles.Box>
                </CommonStyles.Box>
              );
            }}
          />
        </CommonStyles.Box>
      </CommonStyles.Heading>

      <CommonStyles.Box sx={{ mt: 2 }}>
        <CommonStyles.Table
          sxTableHead={{
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: theme.colors?.custom?.textGreyLighter,
            fontWeight: '550',
          }}
          isLoading={isLoading || isRefetching || isFetchingPage}
          order={Order.desc}
          orderBy={Order.desc}
          selected={rowsSelected}
          page={filters.page}
          headCells={headCell}
          totalCount={totalItems}
          rows={listTourBooking}
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

export default React.memo(BookingTable);
