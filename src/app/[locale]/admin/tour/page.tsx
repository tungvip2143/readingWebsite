'use client';

import React from 'react';
import DialogCreateTour from './Dialog/DialogCreateTour';
import useToggleDialog from 'hooks/useToggleDialog';
import CommonStyles from 'components/CommonStyles';
import { Order, SelectOption } from 'interfaces/common';
import { useTranslations } from 'next-intl';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import TextField from 'components/CustomFields/TextField';
import CellActions from './CellActions/CellActions';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { cloneDeep, isEmpty } from 'lodash';
import { Tour } from 'modules/tour/tour.interface';
import { useTheme, Rating } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CustomFields from 'components/CustomFields';
import { TourStatus } from 'constants/common';
import { IMG_URL } from 'constants/apiUrls';
import moment, { MomentInput } from 'moment';
import useGetListTour from 'modules/tour/hooks/useGetListTour';
import cachedKeys from 'constants/cachedKeys';
import useConstants from 'hooks/useConstants';
import AutoCompleteProvince from 'components/AutoCompleteProvince';

export interface FormFilterValueTour {
  page?: number;
  perPage?: number;
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
  categories?: string;
  createdAt?: string;
  status?: TourStatus | string;
  provinceCode?: SelectOption | string;
}

const initialFilters: FormFilterValueTour = {
  page: 1,
  perPage: 10,
  sortField: 'createdAt',
  sortOrder: Order.desc,
  textSearch: '',
  status: '',
  createdAt: Order.desc,
  provinceCode: { label: '', value: '' },
};

const TourList = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const { optionsTourStatus, optionsSortCreatedAt } = useConstants();

  const {
    filters,
    rowsSelected,
    resetToInitialFilters,
    handleRequestSort,
    handleChangePage,
    changeRowPerPage,
    handleSelectAll,
    handleCheckBox,
    handleSearch,
  } = useFiltersHandler(initialFilters);

  const {
    data: resTourList,
    isLoading,
    isRefetching,
    isFetchingPage,
  } = useGetListTour(filters, {
    refetchKey: cachedKeys.refetchListTour,
  });

  const {
    shouldRender: shouldRenderCreate,
    open: openCreate,
    toggle: toggleCreate,
  } = useToggleDialog();

  const transformDateTime = (createdAt: string | Date | undefined) => {
    const hour = moment(createdAt as MomentInput).format('HH:mm');
    const day = moment(createdAt as MomentInput).format('DD/MM/YYYY');
    return (
      <span>
        <span style={{ marginRight: '0.375rem' }}>{hour}</span>
        {day}
      </span>
    );
  };

  const listIsNotSortBy = ['destination', 'categories', 'createdBy'];

  const headCells = [
    {
      id: 'thumbnail',
      label: t('Tour.tourImage'),
      Cell: (row: Tour) => {
        return (
          <CommonStyles.Box>
            <img
              src={`${IMG_URL}/${row.thumbnail}`}
              alt='Tour image'
              style={{
                width: '6.25rem',
                height: '5rem',
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
      label: t('Tour.name'),
      Cell: (row: Tour) => {
        return (
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '0.875rem',
              color: theme.colors?.custom?.textBlack,
              fontWeight: 600,
              minWidth: '6.25rem',
              textAlign: 'center',
            }}
          >
            {row.name}
          </CommonStyles.Typography>
        );
      },
    },
    {
      id: 'status',
      label: t('Tour.status'),
      Cell: (row: Tour) => {
        return (
          <CommonStyles.Badge
            label={row.status}
            category='purple'
            sx={{
              fontSize: '0.875rem',
              minWidth: '5.75rem',
              textAlign: 'center',
              borderRadius: '0.5rem',
              padding: '0.375rem 0.5rem',
            }}
          />
        );
      },
    },
    {
      id: 'categories',
      label: t('Tour.category'),
      Cell: (row: Tour) => {
        return (
          <CommonStyles.Box>
            {row?.categories?.map((el: any) => {
              return (
                <CommonStyles.Badge
                  key={el.id}
                  label={el.category.name}
                  category='blue'
                  sx={{
                    fontSize: '0.875rem',
                    minWidth: '3.375rem',
                    textAlign: 'center',
                    borderRadius: '0.5rem',
                    padding: '0.375rem 0.5rem',
                    marginBottom: '0.5rem',
                  }}
                />
              );
            })}
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'destination',
      label: t('Tour.city'),
      Cell: (row: Tour) => {
        return (
          <CommonStyles.Box
            sx={{
              fontSize: '0.875rem',
              color: theme.colors?.custom?.textBlack,
              minWidth: '6rem',
            }}
          >
            {row?.Area?.name}
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'createdAt',
      label: t('Tour.createdAt'),
      Cell: (row: Tour) => {
        return (
          <CommonStyles.Box
            sx={{
              fontSize: '0.875rem',
              color: theme.colors?.custom?.textBlack,
              minWidth: '6.625rem',
            }}
          >
            {transformDateTime(row.createdAt)}
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'createdBy',
      label: t('Tour.createdBy'),
      Cell: (row: Tour) => {
        return (
          <CommonStyles.Box
            sx={{
              fontSize: '0.875rem',
              color: theme.colors?.custom?.textBlack,
              minWidth: '8.75rem',
              textAlign: 'center',
            }}
          >
            {!isEmpty(row.adminCreatedBy)
              ? `${row.adminCreatedBy?.firstName} ${row.adminCreatedBy?.lastName}`
              : `${row.createdBy?.firstName} ${row.createdBy?.lastName}`}
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'avgRate',
      label: t('Tour.rating'),
      Cell: (row: Tour) => {
        return (
          <CommonStyles.Box
            sx={{
              '&  .MuiRating-root.Mui-disabled': {
                opacity: 1,
              },
            }}
          >
            <Rating value={row.avgRate} precision={0.5} disabled />
          </CommonStyles.Box>
        );
      },
    },
    {
      id: 'actions',
      label: '',
      Cell: (row: Tour) => {
        return <CellActions tour={row} />;
      },
    },
  ];

  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      {shouldRenderCreate && <DialogCreateTour isOpen={openCreate} toggle={toggleCreate} />}

      <CommonStyles.Heading
        title={t('Tour.tourList')}
        rightContent={
          <CommonStyles.Button
            startIcon={<CommonIcons.AddIcon />}
            onClick={toggleCreate}
            sx={{
              color: theme.colors?.white,
              backgroundColor: theme.colors?.primary500,
              '&.MuiLoadingButton-root:hover': {
                backgroundColor: theme.colors?.primary500,
                opacity: '0.6',
              },
            }}
          >
            {t('Tour.addTour')}
          </CommonStyles.Button>
        }
      >
        <CommonStyles.Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            [theme.breakpoints.down('xl')]: {
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            },
          }}
        >
          <SearchAndFilters
            initialValues={filters}
            onSubmit={(values) => {
              if ('createdAt' in values) {
                const { createdAt, ...nextValues } = values;
                handleSearch({ ...nextValues, provinceCode: values.provinceCode });
              } else {
                handleSearch(cloneDeep(values));
              }
            }}
            onReset={() => {
              resetToInitialFilters();
            }}
            styleWrapperForm={{ flex: '1' }}
            sxContainer={{
              [theme.breakpoints.down('xl')]: {
                display: 'flex',
                flexDirection: 'column',
              },
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
                  <CommonStyles.Box sx={{ flex: 1 }}>
                    <FastField
                      variant='outlined'
                      component={TextField}
                      name='textSearch'
                      placeholder={t('Common.search')}
                      iconInput={<CommonIcons.Search />}
                      className='input-search'
                      size='small'
                      fullWidth
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
                    <CommonStyles.Box sx={{}}>
                      <FastField
                        name='status'
                        component={CustomFields.SelectField}
                        options={optionsTourStatus}
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
                        // label='Status'
                        placeholder={t('Tour.statusTourDefault')}
                        className='active-select'
                        fullWidth
                        onChangeCustomize={(value: TourStatus) => {
                          if (value !== undefined) {
                            propsFormik.setFieldValue('status', value);
                          }
                        }}
                      />
                    </CommonStyles.Box>

                    <CommonStyles.Box sx={{}}>
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

                    <CommonStyles.Box>
                      <AutoCompleteProvince name='provinceCode' />
                    </CommonStyles.Box>
                  </CommonStyles.Box>
                </CommonStyles.Box>
              );
            }}
            sxDefaultSubmit={{
              [theme.breakpoints.down('sm')]: {
                display: 'flex',
                justifyContent: 'space-between',
              },
            }}
            sxBtnSearch={{
              [theme.breakpoints.down('sm')]: {
                padding: '0.33rem 1.33rem',
              },
            }}
          />
        </CommonStyles.Box>
      </CommonStyles.Heading>

      <CommonStyles.Table
        sxTableHead={{
          textAlign: 'center',
          fontSize: '0.8125rem',
          color: theme.colors?.custom?.textGreyLighter,
          fontWeight: '550',
        }}
        headCells={headCells}
        rows={resTourList?.items || []}
        selected={rowsSelected}
        order={filters.sortOrder || Order.desc}
        orderBy={''}
        page={filters.page || 1}
        rowsPerPage={filters.perPage || 5}
        totalCount={resTourList?.totalItems || 0}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={changeRowPerPage}
        handleRequestSort={handleRequestSort}
        handleSelectAllClick={handleSelectAll}
        handleCheckBox={handleCheckBox}
        showCheckBox
        isLoading={isFetchingPage || isRefetching || isLoading}
        sortByIsActived={listIsNotSortBy}
      />
    </CommonStyles.Box>
  );
};

export default TourList;
