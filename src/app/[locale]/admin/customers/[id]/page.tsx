'use client';

import CommonStyles from 'components/CommonStyles';
import { InputAdornment, useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import { BodyChangeStatus, TourBooking } from 'modules/customers/customer.interface';
import { FastField, Form, Formik } from 'formik';
import CustomFields from 'components/CustomFields';
import { useTranslations } from 'next-intl';
import useGetDetailCustomer from 'modules/customers/hooks/useGetDetailCustomer';
import { useParams } from 'next/navigation';
import useGetListTourBookingCustomer from 'modules/customers/hooks/useGetListTourBookingCustomer';
import moment from 'moment';
import FormikField from 'components/FormikField';
import { localeNumber } from 'helpers/common';
import useConstants from 'hooks/useConstants';
import { Language } from 'constants/common';
import customerService from 'modules/customers/customer.service';
import { showError, showSuccess } from 'helpers/toast';
import { AllQueryKeys, useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';

interface DetailCustomerProps {}

const DetailCustomer = (props: DetailCustomerProps) => {
  const theme = useTheme();
  const params = useParams();
  const isID = !!params.id;

  const { data: dataDetailCustomer, isLoading: loadingDetailCustomer } = useGetDetailCustomer(
    params.id,
    { refetchKey: cachedKeys.refetchDetailCustomer, isTrigger: isID }
  );

  const {
    filters,
    rowsSelected,
    handleSelectAll,
    handleCheckBox,
    handleChangePage,
    handleRequestSort,
    changeRowPerPage,
  } = useFiltersHandler({
    page: 1,
    perPage: 5,
    fetchAll: false,
    search: '',
    status: '',
  });

  const { data: listTourBooking } = useGetListTourBookingCustomer(params.id, filters);

  const t = useTranslations('Customer');

  const formatStartDate = (date: any, isCell?: boolean) => {
    if (!date) return '';
    if (isCell) {
      return moment(new Date(date)).utc().format('DD/MM/YYYY');
    }

    return moment(date).format('MMM D, YYYY');
  };

  const formatPriceVND = (number: number) => {
    return localeNumber(number);
  };

  const headCells = [
    {
      label: t('orderID'),
      id: 'id',
    },
    {
      label: t('tourName'),
      id: 'name',
      Cell: (row: TourBooking) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography>{row?.Tours?.name}</CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('customerName'),
      id: 'fullName',
      Cell: (row: TourBooking) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography>
              {row?.Customer?.firstName} {row?.Customer?.lastName}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('date'),
      id: 'createdAt',
      Cell: (row: TourBooking) => {
        const isCell = true;
        const date = formatStartDate(row.startTime, isCell);
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography>{date}</CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('localFriend'),
      id: 'tourGuide',
      Cell: (row: TourBooking) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography>
              {row?.TourGuide?.firstName} {row?.TourGuide?.lastName}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('amountPayment'),
      id: 'price',
      Cell: (row: TourBooking) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography>{formatPriceVND(row.price)} đ</CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('location'),
      id: 'destination',
      Cell: (row: TourBooking) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography>{row?.Tours.Area?.name}</CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('status'),
      id: 'status',
      Cell: (row: TourBooking) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography>{row?.status}</CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('paymentStatus'),
      id: 'paymentStatus',
      Cell: (row: TourBooking) => {
        return (
          <CommonStyles.Typography>{row?.TourBookingTransaction?.status}</CommonStyles.Typography>
        );
      },
    },
  ];
  const totalCount = Number(listTourBooking?.totalItems);

  const { optionsChangeLanguage } = useConstants();

  const refetchDetailCustomer = useGet(cachedKeys.refetchDetailCustomer as AllQueryKeys);

  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.BreadcrumbsMui
        style={{
          mb: 3,
          fontSize: '0,875rem',
          lineHeight: '1,375rem',
          color: theme.colors?.bgneutral500,
        }}
      />

      <CommonStyles.Typography
        sx={{ fontSize: '2rem', color: theme.colors?.bgneutral900, lineHeight: '3rem', ml: 4 }}
      >
        {t('customer')} &nbsp;
        {dataDetailCustomer?.firstName} {dataDetailCustomer?.lastName}
      </CommonStyles.Typography>

      <CommonStyles.Box
        sx={{
          paddingTop: '2rem',
          paddingRight: '4rem',
        }}
      >
        <CommonStyles.Box sx={{ ml: 3 }}>
          <CommonStyles.Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              marginBottom: '1.5rem',
            }}
          >
            <CommonIcons.Info style={{ color: theme.colors?.primary500, fontSize: '1.75rem' }} />
            <CommonStyles.Typography
              sx={{
                fontSize: '1.125rem',
                color: theme.colors?.black,
                lineHeight: '1.75rem',
              }}
            >
              {t('generalInformation')}
            </CommonStyles.Typography>
          </CommonStyles.Box>
          <CommonStyles.Box>
            <Formik
              initialValues={{
                phone: dataDetailCustomer?.phone ? `0${dataDetailCustomer?.phone}` : '',
                email: dataDetailCustomer?.email,
                date: formatStartDate(dataDetailCustomer?.createdAt),
                status: dataDetailCustomer?.status,
              }}
              onSubmit={async (values) => {
                try {
                  if (values?.status === 'ACTIVE') {
                    let response = await customerService.changeStatusCustomer({
                      body: { status: 'BANNED' } as BodyChangeStatus,
                      id: Number(dataDetailCustomer?.id),
                    });
                    if (response.status === 200 || response.status === 201) {
                      refetchDetailCustomer && (await refetchDetailCustomer());
                      showSuccess(t('changeStatusSuccessfully'));
                    }
                    return;
                  }
                  let response = await customerService.changeStatusCustomer({
                    body: { status: 'ACTIVE' } as BodyChangeStatus,
                    id: Number(dataDetailCustomer?.id),
                  });
                  if (response.status === 200 || response.status === 201) {
                    refetchDetailCustomer && (await refetchDetailCustomer());
                    showSuccess(t('changeStatusSuccessfully'));
                  }
                } catch (error) {
                  showError(error);
                }
              }}
              enableReinitialize
            >
              <Form>
                <CommonStyles.Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <CommonStyles.Box sx={{ mr: 1 }}>
                    <CommonStyles.Box sx={{ mb: 3 }}>
                      <CommonStyles.Typography sx={{ color: theme.colors?.black }}>
                        {t('phone')}
                      </CommonStyles.Typography>
                      <FastField
                        component={CustomFields.TextField}
                        name='phone'
                        size='small'
                        disabled
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <CommonIcons.LockIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </CommonStyles.Box>
                    <CommonStyles.Box sx={{ mb: 2 }}>
                      <CommonStyles.Typography sx={{ color: theme.colors?.black }}>
                        {t('language')}
                      </CommonStyles.Typography>
                      <FormikField
                        component={CustomFields.SelectField}
                        name='language'
                        size='small'
                        defaultValue={Language.ENGLISH}
                        options={optionsChangeLanguage}
                        sxSelect={{
                          width: '14.75rem',
                        }}
                        disabled
                      />
                    </CommonStyles.Box>
                    <CommonStyles.Box>
                      <CommonStyles.Typography sx={{ color: theme.colors?.black }}>
                        {t('startDate')}
                      </CommonStyles.Typography>
                      <FastField
                        component={CustomFields.TextField}
                        name='date'
                        size='small'
                        disabled
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <CommonIcons.LockIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </CommonStyles.Box>
                  </CommonStyles.Box>

                  <CommonStyles.Box>
                    <CommonStyles.Box sx={{ mb: 3 }}>
                      <CommonStyles.Typography sx={{ color: theme.colors?.black }}>
                        {t('email')}
                      </CommonStyles.Typography>
                      <FastField
                        component={CustomFields.TextField}
                        name='email'
                        size='small'
                        disabled
                        sx={{ width: '17.625rem' }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <CommonIcons.LockIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </CommonStyles.Box>
                    <CommonStyles.Box sx={{ mb: 5 }}>
                      <CommonStyles.Typography sx={{ color: theme.colors?.black }}>
                        {t('status')}
                      </CommonStyles.Typography>
                      <FormikField
                        component={CustomFields.TextField}
                        name='status'
                        size='small'
                        sx={{ width: '17.625rem' }}
                        disabled
                      />
                    </CommonStyles.Box>
                    <CommonStyles.Button
                      sx={{
                        fontSize: '0.875rem',
                        mb: 5,
                        color: theme.colors?.white,
                        backgroundColor: theme.colors?.primary500,
                        width: '17.625rem',
                        '&:hover': {
                          backgroundColor: theme.colors?.primary500,
                          opacity: 0.6,
                        },
                      }}
                      type='submit'
                    >
                      {t('changeStatus')}
                    </CommonStyles.Button>
                  </CommonStyles.Box>
                </CommonStyles.Box>
              </Form>
            </Formik>
          </CommonStyles.Box>

          <CommonStyles.Box sx={{ width: '50%', ml: 5 }}>
            <CommonStyles.Divider />
          </CommonStyles.Box>
          <CommonStyles.Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 8,
            }}
          >
            <CommonIcons.Info style={{ color: theme.colors?.primary500, fontSize: '1.75rem' }} />
            <CommonStyles.Typography
              sx={{
                fontSize: '1.125rem',
                color: theme.colors?.black,
                lineHeight: '1.75rem',
              }}
            >
              {t('purchaseHistory')}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        </CommonStyles.Box>

        <CommonStyles.Table
          isLoading={loadingDetailCustomer}
          order={Order.desc}
          orderBy={Order.desc}
          selected={rowsSelected}
          page={filters.page}
          headCells={headCells}
          totalCount={totalCount}
          sxTableHead={{ backgroundColor: theme.colors?.bgneutral50 }}
          rows={(listTourBooking?.items as TourBooking[]) || []}
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
export default DetailCustomer;
