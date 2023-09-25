import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import { Order } from 'interfaces/common';
import CommonStyles from 'components/CommonStyles';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { TourGuide } from 'modules/tourGuide/tourGuide.interface';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import CustomFields from 'components/CustomFields';
import CommonIcons from 'components/CommonIcons';
import CellActions from './CellActions/CellActions';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogViewDetails from './Dialog/DialogViewDetails';
import useGetListTourGuide from 'modules/tourGuide/hooks/useGetListTourGuide';
import cachedKeys from 'constants/cachedKeys';
import { Gender, TourGuideInfoStatus } from 'constants/common';
import { convertActiveOrDeactive } from 'helpers/common';
import DialogActiveOrInactive from 'components/DialogFilter/DialogActiveOrInactive';
import { HeadCell } from 'components/CommonStyles/Table';
import DialogInfoStatus from 'components/DialogFilter/DialogInfoStatus';
import { IMG_URL } from 'constants/apiUrls';

interface TourGuideProps {}
export interface IInitialValues {
  page: number;
  perPage: number;
  sortField: string;
  sortOrder: Order;
  textSearch?: string;
  status?: TourGuideInfoStatus;
  isActive?: number;
  tourId?: number;
}
const initialFilters: IInitialValues = {
  page: 1,
  perPage: 10,
  sortField: 'createdAt',
  sortOrder: Order.desc,
  textSearch: '',
  status: undefined,
  isActive: undefined,
  tourId: undefined,
};
const TourGuide = (props: TourGuideProps) => {
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
  } = useFiltersHandler(initialFilters);

  const {
    data: dataTourGuide,
    isLoading,
    isRefetching,
    isFetchingPage,
  } = useGetListTourGuide(filters, { refetchKey: cachedKeys.refetchListTourGuide });

  const theme = useTheme();
  const t = useTranslations();
  const {
    shouldRender: shouldRenderCreate,
    open: openCreate,
    toggle: toggleCreate,
  } = useToggleDialog();

  const listIsNotSortBy = ['TourGuideArea'];

  //! Function
  const totalCount = dataTourGuide?.totalItems || 0;
  const handleCreate = () => {
    toggleCreate();
  };

  const renderGender = (gender: string) => {
    switch (gender) {
      case Gender.MALE:
        return t('Common.male');
      case Gender.FEMALE:
        return t('Common.female');
      case Gender.OTHER:
        return t('Common.other');
      default:
        break;
    }
  };
  const headCell: HeadCell<TourGuide>[] = [
    {
      label: t('LocalFriend.avatar'),
      id: 'avatar',
      Cell: (row: TourGuide) => {
        const avatar = `${IMG_URL}/${row?.avatar}` || '';
        return <CommonStyles.Avatar sx={{ fontWeight: '700' }} src={avatar} />;
      },
    },
    {
      label: t('LocalFriend.email'),
      id: 'email',
      Cell: (row: TourGuide) => {
        const email = row?.email || '';
        return (
          <CommonStyles.Typography sx={{ fontWeight: '700' }}>{email}</CommonStyles.Typography>
        );
      },
    },
    {
      label: t('LocalFriend.firstLastName'),
      id: 'firstName',
      Cell: (row: TourGuide) => {
        const fullName = row?.firstName + row?.lastName || '';
        return (
          <CommonStyles.Typography sx={{ fontWeight: '700' }}>{fullName}</CommonStyles.Typography>
        );
      },
    },
    {
      label: t('LocalFriend.phone'),
      id: 'phone',
      Cell: (row: TourGuide) => {
        const phone = row?.phone || '';
        return (
          <CommonStyles.Typography sx={{ fontWeight: '700' }}>{phone}</CommonStyles.Typography>
        );
      },
    },
    {
      label: t('LocalFriend.infoStatus'),
      id: 'status',
      Cell: (row: TourGuide) => {
        const status = row?.status || '';
        return <CommonStyles.Badge label={status} category='purpleRoundOff' />;
      },
      renderFilters: ({ open, toggle }) => {
        return (
          <DialogInfoStatus
            isOpen={open}
            toggle={toggle}
            initialValues={{ status: filters?.status || undefined }}
            onSubmit={(values, helpersFormik) => {
              setFilters({ ...filters, ...values });
              toggle();
            }}
          />
        );
      },
    },
    {
      label: t('LocalFriend.status'),
      id: 'isActive',
      Cell: (row: TourGuide) => {
        const status = convertActiveOrDeactive(row?.isActive);
        return <CommonStyles.Badge label={status} category='blue' />;
      },
      renderFilters: ({ open, toggle }) => {
        return (
          <DialogActiveOrInactive
            isOpen={open}
            toggle={toggle}
            initialValues={{ isActive: filters?.isActive || undefined }}
            onSubmit={(values, helpersFormik) => {
              setFilters({ ...filters, ...values });
              toggle();
            }}
          />
        );
      },
    },
    {
      label: t('LocalFriend.city'),
      id: 'TourGuideArea',
      Cell: (row: TourGuide) => {
        const area = row?.TourGuideArea?.map((item) => item?.area?.name) || '';
        return (
          <CommonStyles.Typography sx={{ fontWeight: '700' }}>
            {area.join(',')}
          </CommonStyles.Typography>
        );
      },
    },
    {
      label: t('LocalFriend.gender'),
      id: 'gender',
      Cell: (row: TourGuide) => {
        const gender = row?.gender || '';
        return (
          <CommonStyles.Typography sx={{ fontWeight: '700' }}>
            {renderGender(gender)}
          </CommonStyles.Typography>
        );
      },
    },
    {
      label: t('LocalFriend.citizenIdCard'),
      id: 'cid',
      Cell: (row: TourGuide) => {
        const cid = row?.cid || '';
        return <CommonStyles.Typography sx={{ fontWeight: '700' }}>{cid}</CommonStyles.Typography>;
      },
    },
    {
      label: t('LocalFriend.rating'),
      id: 'avgRate',
      Cell: (row: TourGuide) => {
        const rating = Number(row?.avgRate) || 0;
        return <CommonStyles.RatingMui valueTable={rating} readOnly />;
      },
    },
    {
      id: 'actions',
      label: '',
      Cell: (row: TourGuide) => {
        return <CellActions tourGuide={row} />;
      },
    },
  ];

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Heading
        title={t('LocalFriend.listLocalFriend')}
        rightContent={
          <CommonStyles.Button
            startIcon={<CommonIcons.AddIcon />}
            onClick={handleCreate}
            sx={{
              color: theme.colors?.white,
              backgroundColor: theme.colors?.primary500,
              '&.MuiLoadingButton-root:hover': {
                backgroundColor: theme.colors?.primary550,
              },
            }}
          >
            {t('LocalFriend.addLocalfriend')}
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
                  {/* <FastField
                    component={CustomFields.SelectField}
                    name='status'
                    options={optionsActiveOrInactive}
                    label='Status'
                    fullWidth
                    size='small'
                  /> */}
                </CommonStyles.Box>
              );
            }}
          />
        </CommonStyles.Box>
      </CommonStyles.Heading>
      <CommonStyles.Table
        isLoading={isLoading || isRefetching || isFetchingPage}
        order={filters.sortOrder}
        orderBy={filters.sortField}
        selected={rowsSelected}
        page={filters.page}
        headCells={headCell}
        totalCount={totalCount}
        rows={dataTourGuide?.items || []}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={changeRowPerPage}
        rowsPerPage={filters.perPage}
        handleRequestSort={handleRequestSort}
        handleSelectAllClick={handleSelectAll}
        handleCheckBox={handleCheckBox}
        sortByIsActived={listIsNotSortBy}
      />
      {shouldRenderCreate && (
        <DialogViewDetails isOpen={openCreate} toggle={toggleCreate} isCreate />
      )}
    </CommonStyles.Box>
  );
};

export default React.memo(TourGuide);
