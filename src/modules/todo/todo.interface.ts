import { AxiosResponse } from 'axios';
import { PaginationFilters } from 'interfaces/common';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type RequestGetTodoList = {};
export type ResponseGetTodoList = AxiosResponse<Todo[]>;

export type RequestGetTodoListPaging = PaginationFilters;
export type ResponseGetTodoListPaging = AxiosResponse<Todo[]>;