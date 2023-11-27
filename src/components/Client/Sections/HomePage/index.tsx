import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import CardHomePage from './components/CardHomePage';
import { Article } from 'modules/article/article.interface';
import { MAX_HEIGHT_NAVBAR, Topic } from 'constants/common';
import useGetListArticle from 'modules/article/hooks/useGetListArticle';
import cachedKeys from 'constants/cachedKeys';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';

export interface HomePageProps {
  topic?: Topic;
}
export interface IInitialValues {
  page: number;
  page_size: number;
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
  topic?: Topic;
}

const HomePage = ({ topic }: HomePageProps) => {
  const initialFilters: IInitialValues = {
    page: 1,
    page_size: 10,
    // sortField: 'createdAt',
    // sortOrder: Order.desc,
    topic: topic,
    textSearch: '',
  };
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
  return (
    <CommonStylesClient.Box
      sx={{ margin: `${MAX_HEIGHT_NAVBAR}px 0 1.5rem 1.5rem`, paddingTop: '2rem' }}
    >
      <CommonStylesClient.Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {dataArticle?.data?.map((item) => {
          return <CardHomePage data={item} key={item?._id} />;
        })}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default HomePage;
