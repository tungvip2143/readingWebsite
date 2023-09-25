import React from 'react';
import { useTheme } from '@mui/material';
import { useFormatter, useTranslations } from 'next-intl';

import { Order } from 'interfaces/common';
import CommonStyles from 'components/CommonStyles';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Product } from 'modules/service/service.interface';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import CustomFields from 'components/CustomFields';
import useConstants from 'hooks/useConstants';
import useGetServiceList from 'modules/service/hooks/useGetServiceList';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogViewDetails from './Dialog/DialogViewDetails';
import CellActions from './CellActions/CellActions';

interface ServiceTableProps {}

const ServiceTable = (props: ServiceTableProps) => {
  //! State
  const { optionsActiveOrInactive } = useConstants();
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
    limit: 5,
    search: '',
    status: '',
  });

  const { data: dataService, isLoading, isRefetching, isFetchingPage } = useGetServiceList(filters);

  const {
    shouldRender: shouldRenderCreateDialog,
    open: openCreateDialog,
    toggle: toggleCreateDialog,
  } = useToggleDialog();

  const {
    shouldRender: shouldRenderDetailDialog,
    open: openDetailsDialog,
    toggle: toggleDetailsDialog,
  } = useToggleDialog();

  const theme = useTheme();
  const t = useTranslations();
  const headCell = [
    {
      label: t('Service.name'),
      id: 'brand',
      Cell: (row: Product) => {
        const brand = row?.brand || '';
        return <CommonStyles.Badge label={brand} category='' />;
      },
    },
    {
      label: t('Service.serviceType'),
      id: 'category',
      Cell: (row: Product) => {
        const category = row?.category || '';
        return (
          <CommonStyles.Box sx={{ width: 200 }}>
            <img
              width={200}
              alt=''
              height={200}
              src='https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/7/24/photo-7-1690171752809314274686.jpeg'
            />
            <CommonStyles.Badge label={category} category='blue' />
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('Service.location'),
      id: 'price',
      Cell: (row: Product) => {
        const category = row?.category || '';
        return <CommonStyles.Box sx={{ width: 200 }}>{category}</CommonStyles.Box>;
      },
    },
    {
      label: t('Service.phoneEmail'),
      id: 'description',
    },
    {
      label: t('Service.paymentMethods'),
      id: 'stock',
      Cell: (row: Product) => {
        const paymentMethods = row?.stock || 0;
        return <CommonStyles.Box sx={{ width: 200 }}>{paymentMethods}</CommonStyles.Box>;
      },
    },
    {
      label: t('Service.rating'),
      id: 'rating',
      Cell: (row: Product) => {
        const rating = 1;
        return <CommonStyles.RatingMui valueTable={rating} readOnly />;
      },
    },
    {
      label: t('Service.verify'),
      id: 'discountPercentage',
      Cell: (row: Product) => {
        const mockVerifyType = [
          {
            label: 'Chưa verify',
            value: 0,
          },
          {
            label: 'Đã verify',
            value: 1,
          },
        ];
        const verify = 0;
        const verifyRender = mockVerifyType.find((item: any) => item.value === verify);
        return (
          <CommonStyles.Box sx={{ width: 200 }}>
            <CommonStyles.Badge
              label={verifyRender?.label}
              category={verifyRender?.value === 0 ? 'blue' : 'purple'}
            />
          </CommonStyles.Box>
        );
      },
    },
    {
      label: t('Service.action'),
      id: 'action',
      Cell: (row: Product) => {
        return <CellActions data={row} />;
      },
    },
  ];
  //! Function
  const totalCount = dataService?.total || 100;

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Heading
        title={t('Service.heading')}
        rightContent={
          <CommonStyles.Button
            startIcon={<CommonIcons.AddIcon />}
            sx={{ background: theme.colors?.primary500 }}
            onClick={toggleCreateDialog}
          >
            {t('Service.add')}
          </CommonStyles.Button>
        }
      >
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
            renderFilterFields={() => {
              return (
                <CommonStyles.Box sx={{ gap: 2, display: 'flex', flex: 1 }}>
                  <FastField
                    component={CustomFields.TextField}
                    name='search'
                    placeholder={t('Index.search')}
                    sx={{ width: '100%' }}
                    size='small'
                  />
                </CommonStyles.Box>
              );
            }}
          />
        </CommonStyles.Box>
      </CommonStyles.Heading>
      <CommonStyles.Box sx={{ mt: 2 }}>
        <CommonStyles.Table
          isLoading={isLoading || isRefetching || isFetchingPage}
          order={Order.desc}
          orderBy={Order.desc}
          selected={rowsSelected}
          page={filters.page}
          headCells={headCell}
          totalCount={totalCount}
          rows={dataService?.products || []}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={changeRowPerPage}
          rowsPerPage={filters.limit}
          handleRequestSort={handleRequestSort}
          handleSelectAllClick={handleSelectAll}
          handleCheckBox={handleCheckBox}
        />
      </CommonStyles.Box>

      {shouldRenderCreateDialog && (
        <DialogViewDetails isOpen={openCreateDialog} toggle={toggleCreateDialog} />
      )}
    </CommonStyles.Box>
  );
};

export default React.memo(ServiceTable);
