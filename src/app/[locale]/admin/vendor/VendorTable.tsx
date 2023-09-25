import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Order } from 'interfaces/common';
import CommonStyles from 'components/CommonStyles';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Vendor, VendorTypeRelation } from 'modules/vendor/vendor.interface';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import CustomFields from 'components/CustomFields';
import useGetVendorList from 'modules/vendor/hooks/useGetVendorList';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import CellActions from './CellActions/CellActions';
import { IMG_URL } from 'constants/apiUrls';
import DialogCreateVendor from './Dialog/DialogCreateVendor';
import cachedKeys from 'constants/cachedKeys';

interface VendorTableProps {}

const VendorTable = (props: VendorTableProps) => {
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
    setFilters,
  } = useFiltersHandler({
    page: 1,
    perPage: 5,
    sortField: '',
    sortOrder: Order.desc,
    textSearch: '',
  });

  const {
    data: listVendor,
    isLoading,
    isRefetching,
    isFetchingPage,
  } = useGetVendorList(filters, { refetchKey: cachedKeys.refetchListVendor });

  const {
    shouldRender: shouldRenderCreateDialog,
    open: openCreateDialog,
    toggle: toggleCreateDialog,
  } = useToggleDialog();

  const theme = useTheme();
  const t = useTranslations();

  const headCell = [
    {
      label: 'ID',
      id: 'id',
    },
    {
      label: t('Vendor.image'),
      id: 'thumbnail',
      Cell: (row: Vendor) => {
        return (
          <CommonStyles.Box>
            <img
              src={`${IMG_URL}/${row.thumbnail}`}
              alt='Vendor image'
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
      label: t('Vendor.name'),
      id: 'brand',
      Cell: (row: Vendor) => {
        const nameVendor = row?.name;
        return <CommonStyles.Typography>{nameVendor}</CommonStyles.Typography>;
      },
    },
    {
      label: t('Vendor.email'),
      id: 'email',
    },
    {
      label: t('Vendor.phone'),
      id: 'phone',
    },
    {
      label: t('Vendor.status'),
      id: 'status',
      Cell: (row: Vendor) => {
        const status = row?.status;
        return <CommonStyles.Badge label={status} category='purple' />;
      },
    },
    {
      label: t('Vendor.category'),
      id: 'typeVendor',
      Cell: (row: Vendor) => {
        return (
          <CommonStyles.Box>
            {row?.VendorTypeRelation?.map((el: VendorTypeRelation) => {
              return (
                <CommonStyles.Badge
                  key={el.id}
                  label={el.type?.name}
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
      label: t('Vendor.city'),
      id: 'destination',
      Cell: (row: Vendor) => {
        const city = row?.destination?.provinceName;
        return <CommonStyles.Typography>{city}</CommonStyles.Typography>;
      },
    },

    {
      label: t('Vendor.rating'),
      id: 'avgRate',
      Cell: (row: Vendor) => {
        const rating = row?.totalRate || 3;
        return <CommonStyles.RatingMui valueTable={rating} readOnly />;
      },
    },
    {
      label: 'Action',
      id: 'action',
      Cell: (row: Vendor) => {
        return <CellActions vendor={row} />;
      },
    },
  ];
  //! Function
  const totalCount = Number(listVendor?.totalItems) | 0;

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Heading
        title={t('Vendor.heading')}
        rightContent={
          <CommonStyles.Button
            startIcon={<CommonIcons.AddIcon />}
            sx={{ background: theme.colors?.primary500 }}
            onClick={toggleCreateDialog}
          >
            {t('Vendor.add')}
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
                    name='textSearch'
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
          rows={listVendor?.items || []}
          sxTableHead={{ backgroundColor: theme.colors?.bgneutral50 }}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={changeRowPerPage}
          rowsPerPage={filters.perPage}
          handleRequestSort={handleRequestSort}
        />
      </CommonStyles.Box>

      {shouldRenderCreateDialog && (
        <DialogCreateVendor isOpen={openCreateDialog} toggle={toggleCreateDialog} />
      )}
    </CommonStyles.Box>
  );
};

export default React.memo(VendorTable);
