import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import { Order } from 'interfaces/common';
import CommonStyles from 'components/CommonStyles';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Article } from 'modules/article/article.interface';
import SearchAndFilters from 'components/SearchAndFilters';
import { FastField } from 'formik';
import CustomFields from 'components/CustomFields';
import CommonIcons from 'components/CommonIconsMui';
import CellActions from './CellActions/CellActions';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogViewDetails from './Dialog/DialogViewDetails';
import useGetListArticle from 'modules/article/hooks/useGetListArticle';
import cachedKeys from 'constants/cachedKeys';
import { convertActiveOrDeactive } from 'helpers/common';
import { HeadCell } from 'components/CommonStyles/Table';
import { IMG_URL } from 'constants/apiUrls';
import moment from 'moment';
import { DEFAULT_FORMAT_DATE, Topic } from 'constants/common';

interface ArticleProps {}
export interface IInitialValues {
  page: number;
  perPage: number;
  sortField: string;
  sortOrder: Order;
  textSearch?: string;
}
const initialFilters: IInitialValues = {
  page: 1,
  perPage: 10,
  sortField: 'createdAt',
  sortOrder: Order.desc,
  textSearch: '',
};
const dataMock: Article[] = [
  {
    id: 1,
    titleArticle: 'Empowering Sisterhood: The Feminine Force Behind ‘The Marvels’',
    subtitleArticle: 'aa',
    topicArticle: Topic.EVENTS,
    articleBackground: {
      url: 'https://png.pngtree.com/thumb_back/fw800/background/20230611/pngtree-cute-funny-kitten-and-puppy-image_2918764.jpg',
      content: '',
    },
    contentArticle: 'aa',
    createdAt: '2021-12-10T03:00:00.000Z',
  },
  {
    id: 2,
    titleArticle: 'Storytelling With Impact: Plan A Production’s Cultural And Commercial Success',
    subtitleArticle: 'aa',
    topicArticle: Topic.THREE_F,
    articleBackground: {
      url: 'https://png.pngtree.com/thumb_back/fw800/background/20230611/pngtree-cute-funny-kitten-and-puppy-image_2918764.jpg',
      content: '',
    },
    contentArticle: 'aa',
    createdAt: '2021-11-10T03:00:00.000Z',
  },
  {
    id: 3,
    titleArticle: 'Empowering Global Minds: How Finest Future Reshapes International Education',
    subtitleArticle: 'aa',
    topicArticle: Topic.CHARITY,
    articleBackground: {
      url: 'https://png.pngtree.com/thumb_back/fw800/background/20230611/pngtree-cute-funny-kitten-and-puppy-image_2918764.jpg',
      content: '',
    },
    contentArticle: 'aa',
    createdAt: '2021-10-10T03:00:00.000Z',
  },
];
const Article = (props: ArticleProps) => {
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
    data: dataArticle,
    isLoading,
    isRefetching,
    isFetchingPage,
  } = useGetListArticle(filters, { refetchKey: cachedKeys.refetchListArticle });

  const theme = useTheme();
  const t = useTranslations();
  const {
    shouldRender: shouldRenderCreate,
    open: openCreate,
    toggle: toggleCreate,
  } = useToggleDialog();

  const listIsNotSortBy = ['ArticleArea'];

  //! Function
  const totalCount = dataArticle?.totalItems || 0;
  const handleCreate = () => {
    toggleCreate();
  };

  const headCell: HeadCell<Article>[] = [
    {
      label: t('Articles.avatar'),
      id: 'articleBackground',
      Cell: (row: Article) => {
        // const avatar = `${IMG_URL}/${row?.articleBackground}` || '';
        const avatar = row?.articleBackground?.url || '';
        return <CommonStyles.Avatar sx={{ fontWeight: '700' }} src={avatar} />;
      },
    },
    {
      label: t('Articles.name'),
      id: 'titleArticle',
      Cell: (row: Article) => {
        const email = row?.titleArticle || '';
        return <CommonStyles.Typography>{email}</CommonStyles.Typography>;
      },
    },
    {
      label: t('Articles.createdAt'),
      id: 'createAt',
      Cell: (row: Article) => {
        const createAt = moment(row?.createdAt).format(DEFAULT_FORMAT_DATE) || '';
        return <CommonStyles.Typography>{createAt}</CommonStyles.Typography>;
      },
    },
    {
      label: t('Articles.topic'),
      id: 'topicArticle',
      Cell: (row: Article) => {
        const topic = row?.topicArticle || '';
        return <CommonStyles.Badge label={topic} category={topic} />;
      },
      // renderFilters: ({ open, toggle }) => {
      //   return (
      //     <DialogInfoStatus
      //       isOpen={open}
      //       toggle={toggle}
      //       initialValues={{ status: filters?.status || undefined }}
      //       onSubmit={(values, helpersFormik) => {
      //         setFilters({ ...filters, ...values });
      //         toggle();
      //       }}
      //     />
      //   );
      // },
    },
    {
      label: t('Articles.action'),
      id: 'actions',
      Cell: (row: Article) => {
        return <CellActions article={row} />;
      },
    },
  ];

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Heading
        title={t('Articles.listArticle')}
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
            {t('Articles.addArticles')}
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
        order={filters.sortOrder}
        orderBy={filters.sortField}
        selected={rowsSelected}
        page={filters.page}
        headCells={headCell}
        totalCount={totalCount}
        rows={dataMock || []}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={changeRowPerPage}
        rowsPerPage={filters.perPage}
        handleRequestSort={handleRequestSort}
        // handleSelectAllClick={handleSelectAll}
        // handleCheckBox={handleCheckBox}
        sortByIsActived={listIsNotSortBy}
      />
      {shouldRenderCreate && (
        <DialogViewDetails isOpen={openCreate} toggle={toggleCreate} isCreate />
      )}
    </CommonStyles.Box>
  );
};

export default React.memo(Article);
