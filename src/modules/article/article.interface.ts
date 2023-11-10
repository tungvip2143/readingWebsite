import { AxiosResponse } from 'axios';
import { Topic } from 'constants/common';
import { PaginationFilters, ResponseCommon } from 'interfaces/common';

export interface ArticleBackground {
  url: string;
  content: string;
}
export interface Article {
  id: number;
  titleArticle: string;
  subtitleArticle: string;
  topicArticle: Topic;
  articleBackground: ArticleBackground;
  contentArticle?: string;
  createdAt: string;
}
export interface GetListArticle extends PaginationFilters {
  sortField?: string;
  sortOrder?: string;
  textSearch?: string;
}
export interface ArticleList {
  items: Article[];
  perPage: number;
  total: number;
  totalPage: number;
  totalItems: number;
}

export type RequestGetListArticle = GetListArticle;

export type ResponseGetListArticle = AxiosResponse<ResponseCommon<ArticleList>>;

export type RequestGetDetailArticle = string | number;
export type ResponseGetDetailArticle = AxiosResponse<ResponseCommon<Article>>;

export type RequestCreateArticle = {
  titleArticle: string;
  topicArticle: string;
  articleBackground: string;
  contentArticle: string;
};

export type ResponseCreateArticle = AxiosResponse<ResponseCommon<RequestCreateArticle>>;

export type RequestUpdateArticle = {
  id: string | number;
  body: RequestCreateArticle;
};

export type ResponseUpdateArticle = AxiosResponse<Article>;

export type RequestDeleteArticle = { id: string | number };
export type ResponseDeleteArticle = AxiosResponse<{}>;
