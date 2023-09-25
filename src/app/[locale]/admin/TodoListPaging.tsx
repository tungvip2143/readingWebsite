'use client';

import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { DEFAULT_ROW_PER_PAGE } from 'constants/common';
import useFiltersHandler from 'hooks/useFiltersHandler';
import useGetTodoListPaging from 'modules/todo/hooks/useGetTodoListPaging';

const TodoListPaging = () => {
  const { filters, increasePage, resetToInitialFilters } = useFiltersHandler({
    page: 1,
    limit: DEFAULT_ROW_PER_PAGE,
  });
  const { data, isLoading, isFetchingPage } = useGetTodoListPaging(filters);

  if (isLoading) {
    return <CommonStyles.Loading />;
  }

  return (
    <CommonStyles.Box sx={{ mt: 1 }}>
      <CommonStyles.Box sx={{ border: 1, p: 2, borderRadius: 2 }}>
        <CommonStyles.Typography variant='h5'>Filters handlers demo</CommonStyles.Typography>
        <CommonStyles.Box>{JSON.stringify(filters)}</CommonStyles.Box>
        <CommonStyles.Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
          <CommonStyles.Button onClick={increasePage}>Increase page</CommonStyles.Button>
          <CommonStyles.Button variant='outlined' onClick={resetToInitialFilters}>
            Reset
          </CommonStyles.Button>
        </CommonStyles.Box>
      </CommonStyles.Box>

      {isFetchingPage && <CommonStyles.Loading />}

      <CommonStyles.Box
        sx={{
          border: 1,
          borderRadius: 2,
          mt: 2,
          p: 1,
        }}
      >
        <CommonStyles.Typography variant='h5'>Todos</CommonStyles.Typography>
        <CommonStyles.Box>
          {data.map((el) => {
            return (
              <CommonStyles.Box key={el.id}>
                {el.id} - {el.title}
              </CommonStyles.Box>
            );
          })}
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default TodoListPaging;
