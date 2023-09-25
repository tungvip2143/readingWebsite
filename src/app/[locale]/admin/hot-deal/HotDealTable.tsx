import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { FastField } from 'formik';
import CustomFields from 'components/CustomFields';
import { Order } from 'interfaces/common';
import SearchAndFilters from 'components/SearchAndFilters';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import useToggleDialog from 'hooks/useToggleDialog';
import DialogCreateHotDeal from './Dialog/DialogCreateHotDeal';
import useGetListHotDeal from 'modules/hotDeal/hooks/useGetListHotDeal';
import { IMG_URL } from 'constants/apiUrls';
import { HotDeal } from 'modules/hotDeal/hotDeal.interface';
import moment from 'moment';
import cachedKeys from 'constants/cachedKeys';
import CellActions from './CellActions/CellActions';

interface HotDealTableProps {}

const HotDealTable = (props: HotDealTableProps) => {
  //! State

  const theme = useTheme();
  const t = useTranslations();

  const {
    open: openCreate,
    toggle: toggleCreate,
    shouldRender: shouldRenderCreate,
  } = useToggleDialog();

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
    perPage: 5,
    sortField: '',
    sortOrder: Order.desc,
    textSearch: '',
    status: undefined,
    type: undefined,
    from: undefined,
    to: undefined,
  });

  const {
    data: dataHotDeal,
    isLoading,
    isRefetching,
    isFetchingPage,
  } = useGetListHotDeal(filters, { refetchKey: cachedKeys.refetchListHotDeal });
  const resHotDeal = dataHotDeal?.data?.data;
  const totalCount = resHotDeal?.totalItems || 0;

  const headCells = [
    {
      label: t('HotDeal.image'),
      id: 'image',
      Cell: (row: HotDeal) => {
        const image = `${IMG_URL}/${row?.bannerUrl}` || '';
        return (
          <CommonStyles.Box>
            <img
              src={image}
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
      label: t('HotDeal.nameHotDeal'),
      id: 'nameHotDeal',
      Cell: (row: HotDeal) => {
        return (
          <CommonStyles.Typography style={{ color: theme.colors?.bgneutral900 }}>
            {row.name}
          </CommonStyles.Typography>
        );
      },
    },
    {
      label: t('HotDeal.status'),
      id: 'status',
      Cell: (row: HotDeal) => {
        const statusCampain = row?.status || '';
        return <CommonStyles.Badge label={statusCampain} category='purple' />;
      },
    },
    {
      label: t('HotDeal.category'),
      id: 'type',
      Cell: (row: HotDeal) => {
        const type = row?.type || '';
        return <CommonStyles.Badge label={type} category='blue' />;
      },
    },
    {
      label: t('HotDeal.timeLine'),
      id: 'timeLine',
      Cell: (row: HotDeal) => {
        const from = moment(row?.from).format('DD/MM/YYYY');
        const to = moment(row?.to).format('DD/MM/YYYY');
        return (
          <CommonStyles.Typography style={{ color: theme.colors?.bgneutral900 }}>
            {`${from}-${to}`}
          </CommonStyles.Typography>
        );
      },
    },
    {
      id: 'actions',
      label: '',
      Cell: (row: HotDeal) => {
        return <CellActions hotDeal={row} />;
      },
    },
  ];
  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      {shouldRenderCreate && <DialogCreateHotDeal isOpen={openCreate} toggle={toggleCreate} />}

      <CommonStyles.Heading
        title={t('HotDeal.hotDeal')}
        rightContent={
          <CommonStyles.Button
            startIcon={<CommonIcons.AddIcon />}
            onClick={toggleCreate}
            sx={{
              textTransform: 'none',
              color: theme.colors?.white,
              backgroundColor: theme.colors?.primary500,
              '&.MuiLoadingButton-root:hover': {
                backgroundColor: theme.colors?.primary500,
                opacity: '0.6',
              },
            }}
          >
            {t('HotDeal.addCampain')}
          </CommonStyles.Button>
        }
      >
        <CommonStyles.Box sx={{ display: 'flex', mb: 2 }}>
          <SearchAndFilters
            styleWrapperForm={{ flex: 1 }}
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
                    placeholder={t('Common.search')}
                    iconStartInput={<CommonIcons.Search />}
                    sx={{ width: '100%' }}
                    size='small'
                  />
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
        rows={resHotDeal?.items || []}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={changeRowPerPage}
        rowsPerPage={filters.perPage}
        handleRequestSort={handleRequestSort}
        handleSelectAllClick={handleSelectAll}
        handleCheckBox={handleCheckBox}
        showCheckBox
      />
    </CommonStyles.Box>
  );
};

export default React.memo(HotDealTable);
