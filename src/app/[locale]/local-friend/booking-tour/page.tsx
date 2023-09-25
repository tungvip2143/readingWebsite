'use client';

import React, { Fragment, useMemo, useState } from 'react';
import CommonIconsClient from 'components/Client/CommonIcons';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import { FilterStatusTourBooking } from 'constants/common';
import SearchAndFilters from 'components/SearchAndFilters';
import { Order } from 'interfaces/common';
import useFiltersHandler from 'hooks/useFiltersHandler';
import useGetListBookingTour from 'modules/bookingTour/hooks/useGetListBookingTour';
import { FastField } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { useTheme } from '@mui/material';
import ListTourBooking from 'components/Client/Components/BookingTour/ListTourBooking';
import Timer from 'helpers/timer';
import { cloneDeep } from 'lodash';
import cachedKeys from 'constants/cachedKeys';
import { AllQueryKeys } from 'stores/useStore';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogFiltersTourBooking from 'components/Client/Components/BookingTour/Dialog/DialogFiltersTourBooking';

export interface FormFilterTourBooking {
  page: number;
  perPage: number;
  sortField: string;
  sortOrder: Order;
  textSearch: string;
  tab?: FilterStatusTourBooking | string;
  type?: string[];
  provinceCode?: string | number;
  rating?: number;
  maxPrice?: number;
  minPrice?: number;
  from?: Date | string;
  to?: Date | string;
  createdAt?: Date | string;
}

const initialFilters: FormFilterTourBooking = {
  page: 1,
  perPage: 10,
  sortField: 'createdAt',
  sortOrder: Order.desc,
  textSearch: '',
  tab: undefined,
  type: [],
  provinceCode: undefined,
  rating: undefined,
  maxPrice: undefined,
  minPrice: undefined,
};

interface TourBookingPageProps {}

const timerInputSearch = new Timer();

const TourBookingPage = (props: TourBookingPageProps) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const {
    open: openFilters,
    toggle: toggleFilters,
    shouldRender: shouldRenderFilters,
  } = useToggleDialog();
  const { filters, setFilters, handleChangePage, handleSearch } = useFiltersHandler(initialFilters);
  const {
    data: resListTourBooking,
    isLoading,
    isRefetching,
    isFetchingPage,
  } = useGetListBookingTour(filters, {
    refetchKey: cachedKeys.refetchListTourBooking as AllQueryKeys,
  });

  const listTourBooking = resListTourBooking?.items || [];
  const totalItems = resListTourBooking?.totalItems || 0;
  const totalPage = resListTourBooking?.totalPage || 0;

  const dataTabs = useMemo(() => {
    return [
      {
        label: t('TourBooking.tourJustUp'),
        value: FilterStatusTourBooking.NEW,
      },
      {
        label: t('TourBooking.registeredTour'),
        value: FilterStatusTourBooking.APPLIED,
      },
      {
        label: t('TourBooking.tourIsWaiting'),
        value: FilterStatusTourBooking.MATCHED,
      },
      {
        label: t('TourBooking.paymentSuccess'),
        value: FilterStatusTourBooking.PAYMENT_SUCCESS,
      },
      {
        label: t('TourBooking.completedTour'),
        value: FilterStatusTourBooking.SUCCESSFULLY,
      },
    ];
  }, [t]);

  const [tabActive, setTabActive] = useState<FilterStatusTourBooking>();

  const listItem = dataTabs.map((el) => {
    return {
      isActive: tabActive === el.value,
      label: el.label,
      onClick: () => {
        setTabActive(el.value);
        setFilters((prev) => {
          const nextFilters = cloneDeep(prev);
          if (nextFilters) {
            nextFilters.tab = el.value;
          }
          return nextFilters;
        });
      },
    };
  });

  //! Function

  //! Render

  return (
    <Fragment>
      {shouldRenderFilters && (
        <DialogFiltersTourBooking
          isOpen={openFilters}
          toggle={toggleFilters}
          filters={filters}
          onSubmit={(values, helpersFormik, toggle) => {
            setFilters((prev) => cloneDeep({ ...prev, ...values }));
            toggle();
          }}
        />
      )}

      <CommonStylesClient.Box>
        <CommonStylesClient.Typography
          variant='h2'
          sx={{
            color: theme.colors?.client.textPaginationBlack,
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.06rem',
            marginBottom: '2rem',
          }}
        >
          {t('TourBooking.tourListForYou')}
        </CommonStylesClient.Typography>

        <CommonStylesClient.Box
          sx={{ display: 'flex', alignItems: 'center', gap: '12.5rem', marginBottom: '1.5rem' }}
        >
          <CommonStylesClient.Box>
            <CommonStylesClient.Tabs
              listItem={listItem}
              sx={{
                fontWeight: 500,
                color: theme.colors?.client.textPaginationBlack,
                borderRadius: '6.25rem',
                backgroundColor: theme.colors?.client.lightBlue,
              }}
              sxActive={{
                fontWeight: 500,
                color: theme.colors?.white,
                borderRadius: '6.25rem',
                backgroundColor: theme.colors?.client.textPaginationBlack,
              }}
            />
          </CommonStylesClient.Box>
          <CommonStylesClient.Box sx={{ flex: 1 }}>
            <SearchAndFilters
              initialValues={filters}
              onSubmit={(values) => {
                const nextValues = { ...filters, textSearch: values.textSearch.trim() };
                handleSearch(nextValues);
              }}
              renderFilterFields={(propsFormik) => {
                return (
                  <CommonStyles.Box sx={{ width: '100%' }}>
                    <FastField
                      variant='outlined'
                      component={TextField}
                      afterOnChange={() => {
                        timerInputSearch.debounce(() => {
                          propsFormik.handleSubmit();
                        }, 1000);
                      }}
                      name='textSearch'
                      sx={{
                        '& div': {
                          borderRadius: '1rem',
                        },
                        '& input': {
                          padding: '0.75rem 0',
                          fontSize: '0.875rem',
                          fontWeight: 400,
                          letterSpacing: '0.018rem',
                        },
                        '& fieldset': {
                          border: `0.09375rem solid ${theme.colors?.client.midGray}`,
                        },
                      }}
                      placeholder={t('TourBooking.searchByTourNameAndArea')}
                      iconStartInput={<CommonIconsClient.IconSearchCustom />}
                      iconEndInput={
                        <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
                          <CommonStylesClient.Divider
                            orientation='vertical'
                            variant='middle'
                            flexItem
                            sx={{
                              borderColor: theme.colors?.client.midGray,
                              margin: 0,
                            }}
                          />
                          <CommonIconsClient.IconFilterCustom />
                        </CommonStyles.Box>
                      }
                      onClickEndAdornment={toggleFilters}
                      sxEndAdornment={{ cursor: 'pointer' }}
                      className='input-search'
                      size='small'
                      fullWidth
                    />
                  </CommonStyles.Box>
                );
              }}
              hideDefaultSubmit
            />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>

        {!isLoading && !isFetchingPage && !isRefetching && listTourBooking.length === 0 ? (
          <CommonStylesClient.Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 1,
              height: '100vh',
              marginTop: '6.25rem',
            }}
          >
            <CommonIcons.InboxIcon fontSize='large' htmlColor={theme.colors?.bgneutral500} />
            <CommonStyles.Typography variant='body1' sx={{ color: theme.colors?.bgneutral500 }}>
              {t('Common.noData')}
            </CommonStyles.Typography>
          </CommonStylesClient.Box>
        ) : !tabActive ? (
          <ListTourBooking
            tourBooking={listTourBooking}
            totalItems={totalItems}
            page={filters.page}
            perPage={filters.perPage}
            onChange={handleChangePage}
            totalPage={totalPage}
          />
        ) : null}

        {dataTabs.map((elm) => {
          if (elm.value === tabActive) {
            return (
              <Fragment key={elm.value}>
                <ListTourBooking
                  tourBooking={listTourBooking}
                  totalItems={totalItems}
                  page={filters.page}
                  perPage={filters.perPage}
                  onChange={handleChangePage}
                  totalPage={totalPage}
                />
              </Fragment>
            );
          }
        })}
      </CommonStylesClient.Box>
    </Fragment>
  );
};

export default React.memo(TourBookingPage);
