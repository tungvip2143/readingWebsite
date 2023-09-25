'use client';

import { useTheme } from '@mui/material';
import useFiltersHandler from 'hooks/useFiltersHandler';
import CommonStyles from 'components/CommonStyles';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import { Customer } from 'modules/customers/customer.interface';
import { Order } from 'interfaces/common';
import CellActions from './CellActions/CellActions';
import { useTranslations } from 'next-intl';
import CommonIcons from 'components/CommonIcons';
import React from 'react';
import useGetCustomerList from 'modules/customers/hooks/useGetCustomerList';
import CustomFields from 'components/CustomFields';
import { cloneDeep } from 'lodash';
import useConstants from 'hooks/useConstants';
import { UserStatus } from 'constants/common';

interface ListCustomerTableProps {}

const ListCustomerTable = () => {
  //! State
  const theme = useTheme();

  const {
    filters,
    setFilters,
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
    perPage: 5,
    sortOrder: Order.desc,
    textSearch: '',
    sortField: 'createdAt',
    status: '',
    createdAt: Order.desc,
  });

  const {
    data: listCustomer,
    isLoading,
    isRefetching,
    isFetchingPage,
  } = useGetCustomerList(filters);

  const t = useTranslations('Customer');

  const headCells = [
    {
      label: t('firstName'),
      id: 'firstName',
      Cell: (row: Customer) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography
              sx={{
                color: theme.colors?.bgneutral900,
                fontSize: '0.875rem',
                lineHeight: '1.375rem',
              }}
            >
              {row?.firstName}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('lastName'),
      id: 'lastName',
      Cell: (row: Customer) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography
              sx={{
                color: theme.colors?.bgneutral900,
                fontSize: '0.875rem',
                lineHeight: '1.375rem',
              }}
            >
              {row?.lastName}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('first&lastName'),
      id: '',
      Cell: (row: Customer) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography
              sx={{
                color: theme.colors?.bgneutral900,
                fontSize: '0.875rem',
                lineHeight: '1.375rem',
              }}
            >
              {row?.firstName} {row?.lastName}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('email'),
      id: 'email',
      Cell: (row: Customer) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography
              sx={{
                color: theme.colors?.bgneutral900,
                fontSize: '0.875rem',
                lineHeight: '1.375rem',
              }}
            >
              {row?.email}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('phone'),
      id: 'phone',
      Cell: (row: Customer) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography
              sx={{
                color: theme.colors?.bgneutral900,
                fontSize: '0.875rem',
                lineHeight: '1.375rem',
              }}
            >
              {row?.phone ? `0${row?.phone}` : ''}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('order'),
      id: 'TourBooking',
      Cell: (row: Customer) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Typography
              sx={{
                color: theme.colors?.bgneutral900,
                fontSize: '0.875rem',
                lineHeight: '1.375rem',
              }}
            >
              {row?.TourBooking?.length}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'detail',
      label: '',
      Cell: (row: Customer) => {
        return <CellActions customer={row} />;
      },
    },
  ];

  const totalCount = listCustomer?.totalItems || 0;
  const { optionsCustomerStatus, optionsSortCreatedAt } = useConstants();
  //! Function

  //! Render

  return (
    <CommonStyles.Box>
      <CommonStyles.Heading title={t('listCustomer')}>
        <CommonStyles.Box sx={{ marginBottom: '2rem' }}>
          <SearchAndFilters
            initialValues={filters}
            onSubmit={(values) => {
              handleSearch(values);
            }}
            onReset={() => {
              resetToInitialFilters();
            }}
            renderFilterFields={(propsFormik) => {
              return (
                <CommonStyles.Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    width: '65%',
                    [theme.breakpoints.down(768)]: {
                      display: 'flex',
                      flexDirection: 'column',
                    },
                    [theme.breakpoints.down('md')]: {
                      width: '100%',
                    },
                    [theme.breakpoints.between('md', 'xl')]: {
                      width: '100%',
                    },
                  }}
                >
                  <CommonStyles.Box sx={{ flex: 1, background: theme.colors?.bgneutral50 }}>
                    <FastField
                      variant='outlined'
                      component={CustomFields.TextField}
                      name='textSearch'
                      placeholder={t('search')}
                      InputProps={{
                        startAdornment: <CommonIcons.Search />,
                      }}
                      size='small'
                      sx={{
                        width: '100%',
                        borderRadius: '0.25rem',
                        '& input': {
                          padding: '0.65rem 0.875rem',
                          fontSize: '0.875rem',
                        },
                      }}
                    />
                  </CommonStyles.Box>

                  <CommonStyles.Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      [theme.breakpoints.down('sm')]: {
                        justifyContent: 'space-between',
                      },
                      [theme.breakpoints.down('md')]: {
                        display: 'flex',
                      },
                    }}
                  >
                    <CommonStyles.Box>
                      <FastField
                        name='status'
                        component={CustomFields.SelectField}
                        options={optionsCustomerStatus}
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
                        placeholder={t('statusCustomerDefault')}
                        className='active-select'
                        fullWidth
                        onChangeCustomize={(value: UserStatus) => {
                          if (value !== undefined) {
                            propsFormik.setFieldValue('status', value);
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
                        label={t('createdAt')}
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
              );
            }}
          />
        </CommonStyles.Box>
      </CommonStyles.Heading>

      <CommonStyles.Table
        isLoading={isLoading || isRefetching || isFetchingPage}
        order={Order.desc}
        orderBy={Order.desc}
        selected={rowsSelected}
        page={filters.page}
        headCells={headCells}
        totalCount={totalCount}
        sxTableHead={{ backgroundColor: theme.colors?.bgneutral50 }}
        rows={(listCustomer?.items as Customer[]) || []}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={changeRowPerPage}
        rowsPerPage={filters.perPage}
        handleRequestSort={handleRequestSort}
      />
    </CommonStyles.Box>
  );
};
export default React.memo(ListCustomerTable);
