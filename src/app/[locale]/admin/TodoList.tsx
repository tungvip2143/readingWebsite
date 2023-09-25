'use client';
import CommonStyles from 'components/CommonStyles';
import useGetTodoList from 'modules/todo/hooks/useGetTodoList';
import React from 'react';

const TodoList = () => {

  const { data, isLoading } = useGetTodoList();

  if (isLoading) {
    return <CommonStyles.Loading />;
  }

  return (
    <CommonStyles.Box sx={{ mt: 1 }}>
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

export default TodoList;
