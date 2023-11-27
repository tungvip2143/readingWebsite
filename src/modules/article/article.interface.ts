import { AxiosResponse } from 'axios';
import { Topic } from 'constants/common';
import { PaginationFilters, ResponseCommon } from 'interfaces/common';

export interface ArticleBackground {
  url: string;
  content: string;
}
export interface Pagination {
  itemCount: number;
  page_size: number;
  pageCount: number;
  page: number;
  slNo: number;
  true: boolean; // "true" is an unusual property name, please make sure it's intended
  prevPage: number | null;
  nextPage: number | null;
}
export interface Article {
  _id: number;
  title: string;
  sub_title: string;
  topic: Topic;
  article_background: string;
  content?: string;
  createdAt: string;
}
export interface GetListArticle extends PaginationFilters {
  sortField?: string;
  sortOrder?: string;
  title?: string;
  topic?: Topic;
}
export interface ArticleList {
  data: Article[];
  pagination: Pagination;
}

export type RequestGetListArticle = GetListArticle;

export type ResponseGetListArticle = AxiosResponse<ArticleList>;

export type RequestGetDetailArticle = string | number;
export type ResponseGetDetailArticle = AxiosResponse<Article>;

export type RequestCreateArticle = {
  title: string;
  sub_title: string;
  topic: Topic;
  article_background: string;
  content: string;
};

export type ResponseCreateArticle = AxiosResponse<ResponseCommon<RequestCreateArticle>>;

export type RequestUpdateArticle = {
  id: string | number;
  body: RequestCreateArticle;
};

export type ResponseUpdateArticle = AxiosResponse<Article>;

export type RequestDeleteArticle = { id: string | number };
export type ResponseDeleteArticle = AxiosResponse<{}>;
