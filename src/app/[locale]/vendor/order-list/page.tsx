'use client';

import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import SearchAndFilters from 'components/SearchAndFilters';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useTheme } from '@mui/material';
import Timer from 'helpers/timer';
import cachedKeys from 'constants/cachedKeys';
import FormikField from 'components/FormikField';
import CustomFields from 'components/CustomFields';
import OrderList from 'components/Client/Components/MerChant/OrderList';
import useGetListReservationVendor from 'modules/reservationVendor/hooks/useGetListReservationVendor';
import { cloneDeep } from 'lodash';
import CommonStyles from 'components/CommonStyles';

const timer = new Timer();

interface TourBookingPageProps {}

export interface FiltersReservationVendor {
  page: number;
  perPage: number;
  textSearch: string;
  time: Date;
}

const OrderListPage = (props: TourBookingPageProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const initialFilters: FiltersReservationVendor = {
    page: 1,
    perPage: 9,
    textSearch: '',
    time: new Date(),
  };

  const { filters, handleSearch, handleChangePage } = useFiltersHandler(initialFilters);
  const {
    data: resListOrder,
    isLoading,
    isFetchingPage,
    isRefetching,
  } = useGetListReservationVendor(filters, {
    refetchKey: cachedKeys.refetchListReservationVendorUIOrderList,
  });

  const dataOrderList = resListOrder?.data?.data?.items || [];
  const totalItems = resListOrder?.data?.data?.totalItems || 0;
  const totalPage = resListOrder?.data?.data?.totalPage || 0;

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        cursor: 'pointer',
      }}
    >
      <CommonStylesClient.Typography
        type='pcHeading3'
        sx={{ color: theme.colors?.client.midBlack }}
      >
        {t('OrderListMerchant.orderListMerchant')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box>
        <SearchAndFilters
          initialValues={filters}
          onSubmit={(values) => {
            handleSearch(cloneDeep(values));
          }}
          hideResetButton
          hideDefaultSubmit
          styleWrapperForm={{ width: '100%', height: '100%' }}
          sxContainer={{
            display: 'flex',
            justifyContent: 'space-between',
            height: 'inherit',
            width: '100%',
          }}
          renderFilterFields={(propsFormik) => {
            return (
              <CommonStylesClient.Box
                sx={{ display: 'flex', alignItems: 'center', gap: '2rem', width: '100%' }}
              >
                <CommonStylesClient.Box
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <CommonStylesClient.Box>
                    <CommonStylesClient.Typography
                      type='mobiHeading4'
                      sx={{ color: theme.colors?.client.midBlack, minWidth: '6.875rem' }}
                    >
                      {t('OrderListMerchant.dateOfOrder')}
                    </CommonStylesClient.Typography>
                  </CommonStylesClient.Box>

                  <FormikField
                    component={CustomFields.DatePickerField}
                    icon={CommonIcons.CalendarWhite}
                    name='time'
                    isDayjs
                    formatCustom='ddd, MMM DD, YYYY'
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
                    afterOnChange={() => {
                      timer.debounce(() => {
                        propsFormik.handleSubmit();
                      }, 400);
                    }}
                  />
                </CommonStylesClient.Box>
                <CommonStylesClient.Box sx={{ maxHeight: '3.25rem', width: '100%' }}>
                  <FormikField
                    component={CustomFields.TextField}
                    name='textSearch'
                    placeholder={t('OrderListMerchant.searchOrder')}
                    iconStartInput={<CommonIcons.IconSearch />}
                    iconEndInput={
                      <CommonStylesClient.Box
                        sx={{
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'center',
                          height: '100%',
                          width: '100%',
                        }}
                      >
                        <CommonStylesClient.Divider orientation='vertical' variant='middle' />
                        <CommonIcons.IconFilter />
                      </CommonStylesClient.Box>
                    }
                    sx={{
                      width: '100%',
                      height: '3.25rem',
                      borderRadius: '1rem',
                      '& div': {
                        borderRadius: '1rem',
                        height: 'inherit',
                        '& input': {
                          height: 'inherit',
                          fontSize: '0.875rem',
                          fontWeight: 400,
                          lineHeight: '1.4rem',
                          color: theme.colors?.client?.midBlack,
                          letterSpacing: '0.0175rem',
                        },
                      },
                      '& fieldset': {
                        border: `0.09375rem solid ${theme.colors?.client.midGray} `,
                      },
                    }}
                    size='small'
                    afterOnChange={() => {
                      timer.debounce(() => {
                        propsFormik.handleSubmit();
                      }, 400);
                    }}
                  />
                </CommonStylesClient.Box>
              </CommonStylesClient.Box>
            );
          }}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box>
        {isLoading || isFetchingPage || isRefetching ? (
          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CommonStylesClient.Loading />
          </CommonStylesClient.Box>
        ) : dataOrderList.length === 0 ? (
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
        ) : (
          <OrderList
            orderList={dataOrderList}
            totalItems={totalItems}
            page={filters.page}
            perPage={filters.perPage}
            totalPage={totalPage}
            onChange={handleChangePage}
          />
        )}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(OrderListPage);
